export const SITE_NAME = "Northwest Bail Bonds";
export const PHONE_DISPLAY = "(406) 601-1225";
export const PHONE_LINK = "+14066011225";
export const EMAIL_ADDRESS = "northwestbailbond@gmail.com";
export const BUSINESS_STREET_ADDRESS = "711 Central Ave Ste. 111";
export const BUSINESS_CITY_LINE = "Billings, MT 59102";
export const BUSINESS_POSTAL_CODE = "59102";
export const FACEBOOK_URL = "https://www.facebook.com/p/Northwest-Bail-Bonds-LLC-100063740815259/";
export const FACEBOOK_REVIEW_URL = "https://www.facebook.com/100063740815259/reviews/";
export const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/search/?api=1&query=Northwest+Bail+Bonds+Billings+Montana";
export const RECOMMENDED_ATTORNEY_URL = "https://lplawpc.com";

const LOCAL_SITE_URL = "http://localhost:3000";

function getBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) return LOCAL_SITE_URL;

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http:// or https://.");
  }
  if (url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an origin only, without a path, credentials, query, or hash.");
  }

  return url.origin;
}

export const BASE_URL = getBaseUrl();

export const COUNTIES = [
  "Beaverhead", "Big Horn", "Blaine", "Broadwater", "Carbon", "Carter",
  "Cascade", "Chouteau", "Custer", "Daniels", "Dawson", "Deer Lodge",
  "Fallon", "Fergus", "Flathead", "Gallatin", "Garfield", "Glacier",
  "Golden Valley", "Granite", "Hill", "Jefferson", "Judith Basin", "Lake",
  "Lewis and Clark", "Liberty", "Lincoln", "Madison", "McCone", "Meagher",
  "Mineral", "Missoula", "Musselshell", "Park", "Petroleum", "Phillips",
  "Pondera", "Powder River", "Powell", "Prairie", "Ravalli", "Richland",
  "Roosevelt", "Rosebud", "Sanders", "Sheridan", "Silver Bow", "Stillwater",
  "Sweet Grass", "Teton", "Toole", "Treasure", "Valley", "Wheatland",
  "Wibaux", "Yellowstone",
] as const;

export const COVERAGE_HUBS = [
  { name: "Billings", county: "Yellowstone County", x: 63, y: 69 },
  { name: "Bozeman", county: "Gallatin County", x: 45, y: 72 },
  { name: "Butte", county: "Silver Bow County", x: 34, y: 65 },
  { name: "Great Falls", county: "Cascade County", x: 39, y: 36 },
  { name: "Helena", county: "Lewis and Clark County", x: 35, y: 49 },
  { name: "Kalispell", county: "Flathead County", x: 19, y: 27 },
  { name: "Miles City", county: "Custer County", x: 78, y: 61 },
  { name: "Missoula", county: "Missoula County", x: 20, y: 52 },
] as const;

export const COUNTY_HUB: Record<(typeof COUNTIES)[number], (typeof COVERAGE_HUBS)[number]["name"]> = {
  Beaverhead: "Butte",
  "Big Horn": "Billings",
  Blaine: "Great Falls",
  Broadwater: "Helena",
  Carbon: "Billings",
  Carter: "Miles City",
  Cascade: "Great Falls",
  Chouteau: "Great Falls",
  Custer: "Miles City",
  Daniels: "Miles City",
  Dawson: "Miles City",
  "Deer Lodge": "Butte",
  Fallon: "Miles City",
  Fergus: "Great Falls",
  Flathead: "Kalispell",
  Gallatin: "Bozeman",
  Garfield: "Miles City",
  Glacier: "Kalispell",
  "Golden Valley": "Billings",
  Granite: "Butte",
  Hill: "Great Falls",
  Jefferson: "Butte",
  "Judith Basin": "Great Falls",
  Lake: "Kalispell",
  "Lewis and Clark": "Helena",
  Liberty: "Great Falls",
  Lincoln: "Kalispell",
  Madison: "Bozeman",
  McCone: "Miles City",
  Meagher: "Great Falls",
  Mineral: "Missoula",
  Missoula: "Missoula",
  Musselshell: "Billings",
  Park: "Bozeman",
  Petroleum: "Miles City",
  Phillips: "Great Falls",
  Pondera: "Great Falls",
  "Powder River": "Miles City",
  Powell: "Helena",
  Prairie: "Miles City",
  Ravalli: "Missoula",
  Richland: "Miles City",
  Roosevelt: "Miles City",
  Rosebud: "Miles City",
  Sanders: "Missoula",
  Sheridan: "Miles City",
  "Silver Bow": "Butte",
  Stillwater: "Billings",
  "Sweet Grass": "Billings",
  Teton: "Great Falls",
  Toole: "Great Falls",
  Treasure: "Billings",
  Valley: "Miles City",
  Wheatland: "Billings",
  Wibaux: "Miles City",
  Yellowstone: "Billings",
};

export const FAQS = [
  {
    question: "What information should I have when I call?",
    answer: "The person’s full name, county or detention facility, bond amount if known, and your callback number are enough to start. Call even if you do not have every detail.",
  },
  {
    question: "How much does a bail bond cost in Montana?",
    answer: "The exact fee and any collateral requirements depend on the bond and circumstances. Ask the agent to explain the full written terms and your responsibilities before you sign.",
  },
  {
    question: "How long does release take?",
    answer: "Timing depends on the court status, detention facility, paperwork, and staffing. An agent can move promptly and keep you informed, but should not guarantee an exact release time.",
  },
  {
    question: "Can Northwest help outside Billings?",
    answer: "Yes. Northwest Bail Bonds serves all 56 Montana counties from its Billings home base. Call with the person’s county or facility to discuss the next step.",
  },
  {
    question: "Can I call late at night or on a holiday?",
    answer: "Yes. The direct line is available 24 hours a day, seven days a week, including weekends and holidays.",
  },
  {
    question: "What should I ask before signing?",
    answer: "Ask about the fee, possible collateral, payment due dates, refund rules if any, the signer’s obligations, the defendant’s court responsibilities, and the producer’s current Montana license.",
  },
] as const;
