export type JailGuide = {
  slug: string;
  county: string;
  city: string;
  facility: string;
  address?: string;
  facilityPhone?: string;
  facilityTel?: string;
  officialUrl: string;
  rosterUrl?: string;
  facilityFact: string;
  custodyNote: string;
};

export const JAIL_GUIDES: readonly JailGuide[] = [
  {
    slug: "yellowstone-county-detention-facility",
    county: "Yellowstone County",
    city: "Billings",
    facility: "Yellowstone County Detention Facility",
    address: "3165 King Avenue East, Billings, MT 59101",
    facilityPhone: "(406) 256-6881",
    facilityTel: "+14062566881",
    officialUrl: "https://www.yellowstonecountymt.gov/sheriff/detention/",
    rosterUrl: "https://www.yellowstonecountymt.gov/Sheriff/Detention/dcsearch.asp",
    facilityFact: "Yellowstone County lists detention booking as a 24-hour contact for inmate bond and charge information.",
    custodyNote: "The county says bonds can be handled through the appropriate court during regular business hours and at the detention facility after hours.",
  },
  {
    slug: "cascade-county-detention-center",
    county: "Cascade County",
    city: "Great Falls",
    facility: "Cascade County Detention Center",
    address: "3800 Ulm North Frontage Road, Great Falls, MT 59404",
    facilityPhone: "(406) 454-6820",
    facilityTel: "+14064546820",
    officialUrl: "https://www.cascadecountymt.gov/313/Detention-Center",
    rosterUrl: "https://www.cascadecountymt.gov/314/Inmate-Roster",
    facilityFact: "Cascade County lists the detention center and Sheriff's Office at the Ulm North Frontage Road campus.",
    custodyNote: "Use the county inmate roster to confirm custody, then call Northwest with the person's full name and any bond information shown.",
  },
  {
    slug: "gallatin-county-detention-center",
    county: "Gallatin County",
    city: "Bozeman",
    facility: "Gallatin County Detention Center",
    address: "605 S. 16th Ave, Bozeman, MT 59715",
    facilityPhone: "(406) 582-2130",
    facilityTel: "+14065822130",
    officialUrl: "https://gallatincountysheriff.com/detention-center/",
    rosterUrl: "https://portal-mt-gallatin-so.centralsquarecloudgov.com/inmates",
    facilityFact: "Gallatin County says the largest portion of people held at the detention center are pretrial.",
    custodyNote: "Gallatin also houses some inmates for other agencies, so confirm the facility before assuming the arresting county is the housing county.",
  },
  {
    slug: "missoula-county-detention-facility",
    county: "Missoula County",
    city: "Missoula",
    facility: "Missoula County Detention Facility",
    address: "2340 Mullan Road, Missoula, MT 59808",
    officialUrl: "https://www.missoulacounty.gov/departments/sheriffs-office/detention-division/",
    rosterUrl: "https://webapps.missoulacounty.us/jailroster/Inmates",
    facilityFact: "Missoula County identifies 2340 Mullan Road as the location for jail services and publishes a public jail roster.",
    custodyNote: "Confirm the person is in the adult detention facility before starting bond paperwork; juvenile and other custody situations follow different procedures.",
  },
  {
    slug: "flathead-county-detention-center",
    county: "Flathead County",
    city: "Kalispell",
    facility: "Flathead County Detention Center",
    address: "920 South Main, Suite 100, Kalispell, MT 59901",
    facilityPhone: "(406) 758-5617",
    facilityTel: "+14067585617",
    officialUrl: "https://flatheadcounty.gov/department-directory/sheriffs-office/jail",
    rosterUrl: "https://apps.flatheadcounty.gov/jailroster/",
    facilityFact: "Flathead County's jail roster includes current inmates, recent bookings, recent releases, bail amount, court date, and charges.",
    custodyNote: "Use the county roster to verify the current bail amount and court information, then call Northwest before relying on a screenshot or older result.",
  },
  {
    slug: "lewis-and-clark-county-detention-center",
    county: "Lewis and Clark County",
    city: "Helena",
    facility: "Lewis & Clark County Detention Center",
    address: "221 Breckenridge Ave, Helena, MT 59601",
    facilityPhone: "(406) 447-8232",
    facilityTel: "+14064478232",
    officialUrl: "https://www.lccountymt.gov/Sheriff/Detention-Center",
    rosterUrl: "https://www.lccountymt.gov/Sheriff/Detention-Center",
    facilityFact: "Lewis and Clark County lists book-and-release operations at the detention center 24 hours a day.",
    custodyNote: "The detention center is at the Law Enforcement Center on Breckenridge Avenue; confirm custody and the bond status before traveling.",
  },
  {
    slug: "butte-silver-bow-detention-center",
    county: "Silver Bow County",
    city: "Butte",
    facility: "Butte-Silver Bow Detention Center",
    address: "155 W Quartz St, Butte, MT 59701",
    facilityPhone: "(406) 497-1189",
    facilityTel: "+14064971189",
    officialUrl: "https://www.co.silverbow.mt.us/3274/Detention-Center",
    rosterUrl: "https://www.co.silverbow.mt.us/3274/Detention-Center",
    facilityFact: "Butte-Silver Bow publishes the current jail roster from the detention center page.",
    custodyNote: "Confirm the person is on the current roster and call Northwest with the full name, bond amount if shown, and the court if known.",
  },
  {
    slug: "ravalli-county-adult-detention-center",
    county: "Ravalli County",
    city: "Hamilton",
    facility: "Ravalli County Adult Detention Center",
    address: "205 Bedford Street, Suite I, Hamilton, MT 59840",
    facilityPhone: "(406) 375-4080",
    facilityTel: "+14063754080",
    officialUrl: "https://ravallicounty.gov/239/Adult-Detention-Center",
    rosterUrl: "https://ravalli-so-mt.zuercherportal.com/",
    facilityFact: "Ravalli County lists the detention entrance on Madison and publishes a current inmate portal.",
    custodyNote: "Check the current roster first. If the person appears there, call Northwest with the name and any bond information available.",
  },
  {
    slug: "custer-county-detention-center",
    county: "Custer County",
    city: "Miles City",
    facility: "Custer County Detention Center",
    address: "1010 Main Street, Miles City, MT 59301",
    facilityPhone: "(406) 874-3301",
    facilityTel: "+14068743301",
    officialUrl: "https://custercountymt.gov/emergency-enforcement/sheriff/",
    rosterUrl: "https://custercountymt.gov/emergency-enforcement/sheriff/",
    facilityFact: "Custer County lists a dedicated detention phone and a current inmate roster from the Sheriff's Office page.",
    custodyNote: "Call detention or use the county roster to confirm custody before beginning bond paperwork.",
  },
  {
    slug: "dawson-county-correctional-facility",
    county: "Dawson County",
    city: "Glendive",
    facility: "Dawson County Correctional Facility",
    address: "440 Colorado Blvd, Glendive, MT 59330",
    facilityPhone: "(406) 377-7600",
    facilityTel: "+14063777600",
    officialUrl: "https://www.dawsonmt.gov/departments/dawson_county_correctional_facility/",
    rosterUrl: "https://www.dawsonmt.gov/departments/dawson_county_correctional_facility/",
    facilityFact: "Dawson County publishes a county jail roster and facility contact information from the correctional facility page.",
    custodyNote: "Dawson County states that pretrial release requires appropriate release authorization. Call Northwest to review the bond shown for the person in custody.",
  },
  {
    slug: "hill-county-detention-center",
    county: "Hill County",
    city: "Havre",
    facility: "Hill County Detention Center",
    address: "1452 2nd Street West, Havre, MT 59501",
    officialUrl: "https://hillcounty.us/departments/sheriff_coroner.php",
    facilityFact: "Hill County identifies the detention center as part of the Hill County Justice Center and lists detention through the Sheriff's Office.",
    custodyNote: "Confirm the person's custody and bond status with the facility, then call Northwest with the full name and court information if available.",
  },
  {
    slug: "lake-county-detention-facility",
    county: "Lake County",
    city: "Polson",
    facility: "Lake County Detention Facility",
    facilityPhone: "(406) 883-7272",
    facilityTel: "+14068837272",
    officialUrl: "https://www.lakemt.gov/272/Detention-Facility",
    rosterUrl: "https://www.lakemt.gov/DocumentCenter/View/816/Jail_Roster",
    facilityFact: "Lake County publishes a daily detention roster and directs current-inmate questions to the detention facility.",
    custodyNote: "Use the daily roster to confirm custody, then call Northwest with the person's full name and any bond information you have.",
  },
] as const;

export function getJailGuide(slug: string) {
  return JAIL_GUIDES.find((guide) => guide.slug === slug);
}

export function hasJailGuide(slug: string) {
  return JAIL_GUIDES.some((guide) => guide.slug === slug);
}

export type CityGuide = {
  slug: string;
  city: string;
  county: string;
  facilitySlug: string;
  facility: string;
  lead: string;
  localNote: string;
};

export const CITY_GUIDES: readonly CityGuide[] = [
  {
    slug: "billings-bail-bonds",
    city: "Billings",
    county: "Yellowstone County",
    facilitySlug: "yellowstone-county-detention-facility",
    facility: "Yellowstone County Detention Facility",
    lead: "Northwest Bail Bonds is based in Billings and answers the direct line 24 hours a day for Yellowstone County bail bonds.",
    localNote: "If the person is at the Yellowstone County Detention Facility, start with the county inmate search or booking line, then call Northwest with the name and bond information.",
  },
  {
    slug: "great-falls-bail-bonds",
    city: "Great Falls",
    county: "Cascade County",
    facilitySlug: "cascade-county-detention-center",
    facility: "Cascade County Detention Center",
    lead: "Northwest provides 24-hour bail bond help for Great Falls and Cascade County from its Billings home base.",
    localNote: "Cascade County publishes a detention roster. Confirm custody there before assuming the person is still at the facility.",
  },
  {
    slug: "bozeman-bail-bonds",
    city: "Bozeman",
    county: "Gallatin County",
    facilitySlug: "gallatin-county-detention-center",
    facility: "Gallatin County Detention Center",
    lead: "Northwest provides 24-hour bail bond help for Bozeman and Gallatin County.",
    localNote: "Gallatin County also houses some inmates for other agencies, so the housing facility and arresting jurisdiction may not always be the same.",
  },
  {
    slug: "missoula-bail-bonds",
    city: "Missoula",
    county: "Missoula County",
    facilitySlug: "missoula-county-detention-facility",
    facility: "Missoula County Detention Facility",
    lead: "Northwest provides 24-hour bail bond help for Missoula and Missoula County.",
    localNote: "The county publishes a public jail roster for the adult detention facility on Mullan Road.",
  },
  {
    slug: "kalispell-bail-bonds",
    city: "Kalispell",
    county: "Flathead County",
    facilitySlug: "flathead-county-detention-center",
    facility: "Flathead County Detention Center",
    lead: "Northwest provides 24-hour bail bond help for Kalispell and Flathead County.",
    localNote: "Flathead County's roster can show bail amount and court date, which makes it useful to check before you call.",
  },
  {
    slug: "helena-bail-bonds",
    city: "Helena",
    county: "Lewis and Clark County",
    facilitySlug: "lewis-and-clark-county-detention-center",
    facility: "Lewis & Clark County Detention Center",
    lead: "Northwest provides 24-hour bail bond help for Helena and Lewis and Clark County.",
    localNote: "The county lists book-and-release operations at the Breckenridge Avenue detention center 24 hours a day.",
  },
  {
    slug: "butte-bail-bonds",
    city: "Butte",
    county: "Silver Bow County",
    facilitySlug: "butte-silver-bow-detention-center",
    facility: "Butte-Silver Bow Detention Center",
    lead: "Northwest provides 24-hour bail bond help for Butte and Silver Bow County.",
    localNote: "Butte-Silver Bow publishes its current jail roster from the detention center page.",
  },
] as const;

export function getCityGuide(slug: string) {
  return CITY_GUIDES.find((guide) => guide.slug === slug);
}
