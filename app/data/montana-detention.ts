import { COUNTIES } from "@/app/lib/site";

export type CountyName = (typeof COUNTIES)[number];

export type DetentionFacility = {
  id: string;
  name: string;
  city?: string;
  kind:
    | "County detention center"
    | "Jail roster"
    | "Sheriff's office"
    | "Out-of-county housing"
    | "Temporary hold facility";
  phone?: string;
  officialUrl?: string;
  officialLinkLabel?: string;
  rosterUrl?: string;
  note?: string;
};

export type CountyDetention = {
  facilities: readonly DetentionFacility[];
  routingNote?: string;
};

type NonEmptyFacilities = readonly [
  DetentionFacility,
  ...DetentionFacility[],
];

const COUNTY_RESOURCES = {
  Beaverhead: [
    {
      id: "beaverhead-county-detention-center",
      name: "Beaverhead County Detention Center",
      city: "Dillon",
      kind: "County detention center",
      phone: "(406) 683-3700 ext. 3718",
      officialUrl: "https://beaverheadcountymt.gov/departments/sheriff/",
    },
  ],
  "Big Horn": [
    {
      id: "big-horn-county-detention-center",
      name: "Big Horn County Detention Center",
      city: "Hardin",
      kind: "County detention center",
      phone: "(406) 665-9792",
      officialUrl: "https://www.bighorncountymt.gov/239/Detention",
      rosterUrl: "https://www.bighorncountymt.gov/240/Current-Inmate-List",
    },
  ],
  Blaine: [
    {
      id: "blaine-county-sheriff",
      name: "Blaine County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://blainecounty-mt.gov/sheriff-coroner/",
    },
  ],
  Broadwater: [
    {
      id: "broadwater-county-detention-center",
      name: "Broadwater County Detention Center",
      city: "Townsend",
      kind: "County detention center",
      phone: "(406) 266-3441",
      officialUrl: "https://www.broadwatercountysheriff.org/inmate_roster",
      rosterUrl: "https://www.broadwatercountysheriff.org/roster.php",
    },
  ],
  Carbon: [
    {
      id: "carbon-county-sheriff",
      name: "Carbon County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://carbonmt.gov/sheriff/",
      note: "Carbon County does not operate a county jail. Contact the Sheriff's Office to confirm the current holding facility.",
    },
  ],
  Carter: [
    {
      id: "carter-county-sheriff",
      name: "Carter County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://www.cartercountymt.gov/services/law_enforcement.php",
    },
  ],
  Cascade: [
    {
      id: "cascade-county-detention-center",
      name: "Cascade County Detention Center",
      city: "Great Falls",
      kind: "County detention center",
      phone: "(406) 454-6820",
      officialUrl: "https://www.cascadecountymt.gov/313/Detention-Center",
      rosterUrl: "https://www.cascadecountymt.gov/314/Inmate-Roster",
    },
  ],
  Chouteau: [
    {
      id: "chouteau-county-detention-center",
      name: "Chouteau County Detention Center",
      city: "Fort Benton",
      kind: "County detention center",
      phone: "(406) 622-3660",
      officialUrl: "https://chouteaucountysheriff.com/",
      rosterUrl: "https://chouteaucountysheriff.com/",
    },
  ],
  Custer: [
    {
      id: "custer-county-detention-center",
      name: "Custer County Detention Center",
      city: "Miles City",
      kind: "County detention center",
      phone: "(406) 874-3301",
      officialUrl: "https://custercountymt.gov/emergency-enforcement/sheriff/",
      rosterUrl: "https://custercountymt.gov/emergency-enforcement/sheriff/",
    },
  ],
  Daniels: [
    {
      id: "daniels-county-sheriff",
      name: "Daniels County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://www.danielscountymt.gov/sheriff",
    },
  ],
  Dawson: [
    {
      id: "dawson-county-correctional-facility",
      name: "Dawson County Correctional Facility",
      city: "Glendive",
      kind: "County detention center",
      phone: "(406) 377-7600",
      officialUrl: "https://www.dawsonmt.gov/departments/dawson_county_correctional_facility/",
      rosterUrl: "https://www.dawsonmt.gov/departments/dawson_county_correctional_facility/",
    },
  ],
  "Deer Lodge": [
    {
      id: "anaconda-deer-lodge-county-jail",
      name: "Anaconda-Deer Lodge County Jail",
      city: "Anaconda",
      kind: "County detention center",
      officialUrl: "https://www.adlc.us/169/Law-Enforcement",
      rosterUrl: "https://www.adlc.us/169/Law-Enforcement",
    },
  ],
  Fallon: [
    {
      id: "fallon-county-sheriff-detention",
      name: "Fallon County Sheriff and Detention",
      city: "Baker",
      kind: "County detention center",
      officialUrl: "https://falloncountymt.gov/sheriff/",
    },
  ],
  Fergus: [
    {
      id: "fergus-county-detention-center",
      name: "Fergus County Detention Center",
      city: "Lewistown",
      kind: "County detention center",
      rosterUrl: "https://fergusmt.gov/detention-center-roster",
    },
  ],
  Flathead: [
    {
      id: "flathead-county-detention-center",
      name: "Flathead County Detention Center",
      city: "Kalispell",
      kind: "County detention center",
      phone: "(406) 758-5617",
      officialUrl: "https://flatheadcounty.gov/department-directory/sheriffs-office/jail",
      rosterUrl: "https://apps.flatheadcounty.gov/jailroster/",
    },
  ],
  Gallatin: [
    {
      id: "gallatin-county-detention-center",
      name: "Gallatin County Detention Center",
      city: "Bozeman",
      kind: "County detention center",
      phone: "(406) 582-2130",
      officialUrl: "https://gallatincountysheriff.com/detention-center/",
      rosterUrl: "https://portal-mt-gallatin-so.centralsquarecloudgov.com/inmates",
    },
  ],
  Garfield: [
    {
      id: "garfield-county-sheriff",
      name: "Garfield County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://garfieldcountymt.gov/department-contacts/",
    },
  ],
  Glacier: [
    {
      id: "glacier-county-jail-resource",
      name: "Glacier County Jail Roster",
      kind: "Jail roster",
      officialUrl: "https://glaciercountymt.gov/category/jail-roster/",
      rosterUrl: "https://glaciercountymt.gov/category/jail-roster/",
    },
  ],
  "Golden Valley": [
    {
      id: "golden-valley-county-sheriff",
      name: "Golden Valley County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://www.goldenvalleycountysheriffsoffice.org/",
    },
  ],
  Granite: [
    {
      id: "granite-county-sheriff-jail",
      name: "Granite County Sheriff's Office and Jail",
      city: "Philipsburg",
      kind: "County detention center",
      officialUrl: "https://www.granitecountymt.gov/598/Sheriff-Coroners-Office",
    },
  ],
  Hill: [
    {
      id: "hill-county-detention-center",
      name: "Hill County Detention Center",
      city: "Havre",
      kind: "County detention center",
      officialUrl: "https://hillcounty.us/departments/sheriff_coroner.php",
    },
  ],
  Jefferson: [
    {
      id: "jefferson-county-detention-center",
      name: "Jefferson County Detention Center",
      city: "Boulder",
      kind: "County detention center",
      officialUrl: "https://www.jeffersoncountysheriffmt.gov/detention-center",
      rosterUrl: "https://jefferson-so-mt.zuercherportal.com/",
    },
  ],
  "Judith Basin": [
    {
      id: "judith-basin-county-sheriff",
      name: "Judith Basin County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://jbcountymt.gov/sheriff/",
    },
  ],
  Lake: [
    {
      id: "lake-county-detention-facility",
      name: "Lake County Detention Facility",
      city: "Polson",
      kind: "County detention center",
      phone: "(406) 883-7272",
      officialUrl: "https://www.lakemt.gov/272/Detention-Facility",
      rosterUrl: "https://www.lakemt.gov/DocumentCenter/View/816/Jail_Roster",
    },
  ],
  "Lewis and Clark": [
    {
      id: "lewis-and-clark-county-detention-center",
      name: "Lewis & Clark County Detention Center",
      city: "Helena",
      kind: "County detention center",
      phone: "(406) 447-8232",
      officialUrl: "https://www.lccountymt.gov/Sheriff/Detention-Center",
      rosterUrl: "https://www.lccountymt.gov/Sheriff/Detention-Center",
    },
  ],
  Liberty: [
    {
      id: "liberty-county-sheriff",
      name: "Liberty County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://www.libertycountymt.gov/sheriff",
    },
  ],
  Lincoln: [
    {
      id: "lincoln-county-detention-center",
      name: "Lincoln County Detention Center",
      city: "Libby",
      kind: "County detention center",
      officialUrl: "https://lincolncountymt.us/sheriff-home/detention/",
      rosterUrl: "https://lincolncountymt.us/sheriff-home/detention/jail-roster/",
    },
  ],
  Madison: [
    {
      id: "madison-county-sheriff",
      name: "Madison County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://madisoncountymt.gov/154/Sheriffs-Office",
      note: "Madison County contracts with surrounding counties to house inmates. Confirm the current receiving facility with the Sheriff's Office.",
    },
    {
      id: "gallatin-county-detention-for-madison",
      name: "Gallatin County Detention Center",
      city: "Bozeman",
      kind: "Out-of-county housing",
      officialUrl: "https://gallatincountysheriff.com/detention-center/",
      rosterUrl: "https://portal-mt-gallatin-so.centralsquarecloudgov.com/inmates",
      note: "Check this roster when Madison County confirms Gallatin County as the receiving facility.",
    },
  ],
  McCone: [
    {
      id: "mccone-county-sheriff",
      name: "McCone County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://mcconecountymt.gov/departments/sheriff-coroner",
    },
  ],
  Meagher: [
    {
      id: "meagher-county-sheriff-detention",
      name: "Meagher County Sheriff's Office and Detention",
      city: "White Sulphur Springs",
      kind: "County detention center",
      officialUrl: "https://meagherco.com/sheriff-s-office",
    },
  ],
  Mineral: [
    {
      id: "mineral-county-sheriff-detention",
      name: "Mineral County Sheriff's Office and Detention",
      city: "Superior",
      kind: "County detention center",
      officialUrl: "https://co.mineral.mt.us/departments/sheriff/",
    },
  ],
  Missoula: [
    {
      id: "missoula-county-detention-facility",
      name: "Missoula County Detention Facility",
      city: "Missoula",
      kind: "County detention center",
      officialUrl: "https://www.missoulacounty.gov/departments/sheriffs-office/detention-division/",
      rosterUrl: "https://webapps.missoulacounty.us/jailroster/Inmates",
    },
  ],
  Musselshell: [
    {
      id: "musselshell-county-detention-center",
      name: "Musselshell County Detention Center",
      city: "Roundup",
      kind: "County detention center",
      officialUrl: "https://musselshellcounty.gov/sheriffs-office/",
    },
  ],
  Park: [
    {
      id: "park-county-detention-center",
      name: "Park County Detention Center",
      city: "Livingston",
      kind: "County detention center",
      officialUrl: "https://www.parkcounty.org/Government-Departments/Sheriff-s-Office/DETENTION-CENTER/",
      rosterUrl: "https://www.parkcounty.org/Government-Departments/Sheriff-s-Office/Inmates-Housed/",
    },
  ],
  Petroleum: [
    {
      id: "petroleum-county-sheriff",
      name: "Petroleum County Sheriff's Department",
      kind: "Sheriff's office",
      officialUrl: "https://petroleumcountymt.org/departments/sheriffs-department/",
    },
  ],
  Phillips: [
    {
      id: "phillips-county-sheriff",
      name: "Phillips County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://phillipscountysheriff.org/",
    },
  ],
  Pondera: [
    {
      id: "pondera-county-detention-center",
      name: "Pondera County Detention Center",
      city: "Conrad",
      kind: "County detention center",
      officialUrl: "https://www.ponderacountymt.gov/sheriff",
    },
  ],
  "Powder River": [
    {
      id: "powder-river-county-jail",
      name: "Powder River County Jail",
      city: "Broadus",
      kind: "County detention center",
      officialUrl: "https://prco.mt.gov/Sheriff-Office",
    },
  ],
  Powell: [
    {
      id: "powell-county-detention-facility",
      name: "Powell County Detention Facility",
      city: "Deer Lodge",
      kind: "County detention center",
      officialUrl: "https://www.powellcountymt.gov/sheriff/page/detention-facility",
    },
  ],
  Prairie: [
    {
      id: "prairie-county-jail-roster",
      name: "Prairie County Jail Roster",
      kind: "Jail roster",
      rosterUrl: "https://www.myr2m.com/PrairieCoRoster/",
    },
  ],
  Ravalli: [
    {
      id: "ravalli-county-adult-detention-center",
      name: "Ravalli County Adult Detention Center",
      city: "Hamilton",
      kind: "County detention center",
      phone: "(406) 375-4080",
      officialUrl: "https://ravallicounty.gov/245/Sheriffs-Office",
      rosterUrl: "https://ravalli-so-mt.zuercherportal.com/",
    },
  ],
  Richland: [
    {
      id: "richland-county-jail",
      name: "Richland County Jail",
      city: "Sidney",
      kind: "County detention center",
      officialUrl: "https://www.richland.org/detention-centers.html",
    },
  ],
  Roosevelt: [
    {
      id: "roosevelt-county-jail",
      name: "Roosevelt County Jail",
      city: "Wolf Point",
      kind: "County detention center",
      officialUrl: "https://www.rooseveltcountymt.gov/sheriff-coroner/",
      rosterUrl: "https://www.rooseveltcountymt.gov/sheriff-coroner/",
    },
  ],
  Rosebud: [
    {
      id: "rosebud-county-detention-center",
      name: "Rosebud County Detention Center",
      city: "Forsyth",
      kind: "County detention center",
      officialUrl: "https://rosebudcountymt.gov/departments/sheriff/",
      rosterUrl: "https://rosebudcountymt.gov/departments/sheriff/",
    },
  ],
  Sanders: [
    {
      id: "sanders-county-sheriff-detention",
      name: "Sanders County Sheriff's Office and Detention",
      city: "Thompson Falls",
      kind: "County detention center",
      officialUrl: "https://co.sanders.mt.us/212/Sheriffs-Office",
    },
  ],
  Sheridan: [
    {
      id: "sheridan-county-temporary-hold-facility",
      name: "Sheridan County Temporary Hold Facility",
      city: "Plentywood",
      kind: "Temporary hold facility",
      officialUrl: "https://www.sheridancountymt.gov/sheriff",
    },
  ],
  "Silver Bow": [
    {
      id: "butte-silver-bow-detention-center",
      name: "Butte-Silver Bow Detention Center",
      city: "Butte",
      kind: "County detention center",
      phone: "(406) 497-1189",
      officialUrl: "https://co.silverbow.mt.us/3274/Detention-Center",
      rosterUrl: "https://co.silverbow.mt.us/3274/Detention-Center",
    },
  ],
  Stillwater: [
    {
      id: "yellowstone-county-detention-for-stillwater",
      name: "Yellowstone County Detention Facility",
      city: "Billings",
      kind: "Out-of-county housing",
      officialUrl: "https://www.stillwatercountymt.gov/252/Sheriff",
      officialLinkLabel: "Stillwater County Sheriff",
      rosterUrl: "https://www.yellowstonecountymt.gov/Sheriff/Detention/dcsearch.asp",
      note: "Stillwater County prisoners are housed through the Yellowstone County Detention Facility.",
    },
  ],
  "Sweet Grass": [
    {
      id: "sweet-grass-county-sheriff",
      name: "Sweet Grass County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://sgcountymt.gov/government-departments/county-govt/sheriff/",
    },
  ],
  Teton: [
    {
      id: "teton-county-sheriff",
      name: "Teton County Sheriff's Office",
      kind: "Sheriff's office",
      officialUrl: "https://www.tetoncountysheriffmt.org/faq",
      officialLinkLabel: "Sheriff & Detention Information",
    },
  ],
  Toole: [
    {
      id: "toole-county-sheriff-detention",
      name: "Toole County Sheriff and Detention",
      city: "Shelby",
      kind: "County detention center",
      officialUrl: "https://toolecountymt.gov/sheriffs-office/",
    },
  ],
  Treasure: [
    {
      id: "rosebud-county-detention-for-treasure",
      name: "Rosebud County Detention Center",
      city: "Forsyth",
      kind: "Out-of-county housing",
      officialUrl: "https://www.treasurecountymt.gov/tcsheriff",
      officialLinkLabel: "Treasure County Sheriff",
      rosterUrl: "https://rosebudcountymt.gov/departments/sheriff/",
      note: "Treasure County directs current inmate roster searches to Rosebud County.",
    },
  ],
  Valley: [
    {
      id: "valley-county-detention-center",
      name: "Valley County Detention Center",
      city: "Glasgow",
      kind: "County detention center",
      officialUrl: "https://www.valleycountymt.gov/1280/Sheriffs-Office",
      rosterUrl: "https://www.valleycountymt.gov/1288/Jail-Roster",
    },
  ],
  Wheatland: [
    {
      id: "wheatland-county-jail",
      name: "Wheatland County Jail",
      city: "Harlowton",
      kind: "County detention center",
      officialUrl: "https://wheatlandcomt.gov/departments/sheriffs-office/",
      rosterUrl: "https://wheatlandcomt.gov/departments/sheriffs-office/",
    },
  ],
  Wibaux: [
    {
      id: "wibaux-county-sheriff",
      name: "Wibaux County Sheriff's Office",
      kind: "Sheriff's office",
      phone: "(406) 796-2415",
      note: "No public online inmate roster is available. Contact the Sheriff's Office or Northwest to confirm the current holding facility.",
    },
  ],
  Yellowstone: [
    {
      id: "yellowstone-county-detention-facility",
      name: "Yellowstone County Detention Facility",
      city: "Billings",
      kind: "County detention center",
      phone: "(406) 256-6881",
      officialUrl: "https://www.yellowstonecountymt.gov/Sheriff/Detention/",
      rosterUrl: "https://www.yellowstonecountymt.gov/Sheriff/Detention/dcsearch.asp",
    },
  ],
} satisfies Record<CountyName, NonEmptyFacilities>;


export function getCountyDetention(county: CountyName): CountyDetention {
  return {
    facilities: COUNTY_RESOURCES[county],
  };
}
