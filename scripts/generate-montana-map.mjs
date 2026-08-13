import { readFile, writeFile } from "node:fs/promises";
import { geoMercator, geoPath } from "d3-geo";
import { feature, merge } from "topojson-client";

const topology = JSON.parse(
  await readFile(new URL("../node_modules/us-atlas/counties-10m.json", import.meta.url), "utf8"),
);

const allCounties = feature(topology, topology.objects.counties).features;
const counties = allCounties.filter((county) => String(county.id).padStart(5, "0").startsWith("30"));
const collection = { type: "FeatureCollection", features: counties };
const projection = geoMercator().fitExtent([[18, 18], [882, 462]], collection);
const path = geoPath(projection);

const countyData = counties
  .map((county) => ({
    fips: String(county.id).padStart(5, "0"),
    name: county.properties.name,
    path: path(county),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const montanaGeometries = topology.objects.counties.geometries.filter((county) =>
  String(county.id).padStart(5, "0").startsWith("30"),
);
const stateOutline = path({ type: "Feature", properties: {}, geometry: merge(topology, montanaGeometries) });

const output = `// Generated from us-atlas county boundaries (U.S. Census cartographic data).\n` +
  `// Run npm run generate:montana-map to refresh.\n` +
  `export const MONTANA_COUNTY_PATHS = ${JSON.stringify(countyData, null, 2)} as const;\n\n` +
  `export const MONTANA_STATE_OUTLINE = ${JSON.stringify(stateOutline)};\n`;

await writeFile(new URL("../app/data/montana-counties.ts", import.meta.url), output);
console.log(`Generated ${countyData.length} Montana county paths.`);
