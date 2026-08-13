import { COUNTIES } from "@/app/lib/site";

export type CountyName = (typeof COUNTIES)[number];

export type DetentionFacility = {
  id: string;
  name: string;
  city: string;
  kind: "County detention center";
  phone?: string;
  officialUrl: string;
  rosterUrl?: string;
};

export type CountyDetention = {
  facilities: DetentionFacility[];
  routingNote?: string;
};

const GENERAL_ROUTING_NOTE =
  "We have not confirmed a separately operated adult detention center for this county. A person may be held locally or transferred to another county or regional facility. Northwest can help confirm the current location.";

const VERIFIED_FACILITIES: Partial<Record<CountyName, DetentionFacility[]>> = {
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
  Custer: [
    {
      id: "custer-county-detention-center",
      name: "Custer County Detention Center",
      city: "Miles City",
      kind: "County detention center",
      phone: "(406) 874-3301",
      officialUrl: "https://custercountymt.gov/emergency-enforcement/sheriff/",
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
    },
  ],
  Jefferson: [
    {
      id: "jefferson-county-detention-center",
      name: "Jefferson County Detention Center",
      city: "Boulder",
      kind: "County detention center",
      officialUrl: "https://www.jeffersoncountysheriffmt.gov/detention-center",
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
    },
  ],
  Missoula: [
    {
      id: "missoula-county-detention-facility",
      name: "Missoula County Detention Facility",
      city: "Missoula",
      kind: "County detention center",
      officialUrl: "https://www.missoulacounty.gov/departments/sheriffs-office/detention-division/",
    },
  ],
  Park: [
    {
      id: "park-county-detention-center",
      name: "Park County Detention Center",
      city: "Livingston",
      kind: "County detention center",
      officialUrl: "https://www.parkcountymt.gov/Government-Departments/Sheriff-s-Office/DETENTION-CENTER/",
      rosterUrl: "https://www.parkcountymt.gov/Government-Departments/Sheriff-s-Office/Inmates-Housed/",
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
  Ravalli: [
    {
      id: "ravalli-county-adult-detention-center",
      name: "Ravalli County Adult Detention Center",
      city: "Hamilton",
      kind: "County detention center",
      phone: "(406) 375-4080",
      officialUrl: "https://ravallicounty.gov/245/Sheriffs-Office",
    },
  ],
  Rosebud: [
    {
      id: "rosebud-county-detention-center",
      name: "Rosebud County Detention Center",
      city: "Forsyth",
      kind: "County detention center",
      officialUrl: "https://rosebudcountymt.gov/departments/sheriff/",
    },
  ],
  "Silver Bow": [
    {
      id: "butte-silver-bow-detention-center",
      name: "Butte-Silver Bow Detention Center",
      city: "Butte",
      kind: "County detention center",
      phone: "(406) 497-1189",
      officialUrl: "https://www.co.silverbow.mt.us/3274/Detention-Center",
    },
  ],
  Valley: [
    {
      id: "valley-county-detention-center",
      name: "Valley County Detention Center",
      city: "Glasgow",
      kind: "County detention center",
      officialUrl: "https://www.valleycountymt.gov/1288/Jail-Roster",
      rosterUrl: "https://www.valleycountymt.gov/1288/Jail-Roster",
    },
  ],
  Yellowstone: [
    {
      id: "yellowstone-county-detention-facility",
      name: "Yellowstone County Detention Facility",
      city: "Billings",
      kind: "County detention center",
      officialUrl: "https://www.yellowstonecountymt.gov/Sheriff/Detention/",
      rosterUrl: "https://www.yellowstonecountymt.gov/Sheriff/Detention/dcsearch.asp",
    },
  ],
};

export const DETENTION_DIRECTORY_REVIEWED = "August 10, 2026";

export function getCountyDetention(county: CountyName): CountyDetention {
  const facilities = VERIFIED_FACILITIES[county] ?? [];
  return {
    facilities,
    routingNote: facilities.length ? undefined : GENERAL_ROUTING_NOTE,
  };
}

