/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  type CountyName,
  type DetentionFacility,
  getCountyDetention,
} from "@/app/data/montana-detention";
import { MONTANA_COUNTY_PATHS, MONTANA_STATE_OUTLINE } from "@/app/data/montana-counties";
import { COUNTIES, EMAIL_ADDRESS, PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";

function getOfficialLinkLabel(facility: DetentionFacility) {
  if (facility.officialLinkLabel) return facility.officialLinkLabel;
  if (facility.kind === "Sheriff's office") return "Sheriff's Office Information";
  if (facility.kind === "Temporary hold facility") return "Sheriff & Holding Information";
  return "Detention & Sheriff Information";
}

export function MontanaCoverage({ compact = false }: { compact?: boolean }) {
  const [selectedCounty, setSelectedCounty] = useState<CountyName>("Yellowstone");
  const [query, setQuery] = useState("");
  const [selectedFacilityId, setSelectedFacilityId] = useState("yellowstone-county-detention-facility");
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [emailReady, setEmailReady] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const matches = useMemo(() => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return [];
    return COUNTIES.filter((county) => county.toLowerCase().includes(cleanQuery));
  }, [query]);
  const countyDetention = getCountyDetention(selectedCounty);
  const selectedFacility = countyDetention.facilities.find(
    (facility) => facility.id === selectedFacilityId,
  );

  function chooseCounty(county: CountyName) {
    const nextFacilities = getCountyDetention(county).facilities;
    setSelectedCounty(county);
    setQuery(county);
    setSelectedFacilityId(nextFacilities[0]?.id ?? "");
  }

  function openIntake() {
    returnFocusRef.current = document.activeElement as HTMLElement;
    setEmailReady(false);
    setIntakeOpen(true);
  }

  function closeIntake() {
    setIntakeOpen(false);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hi Northwest Bail Bonds — I’m trying to locate or ask about someone in custody.",
      `Person: ${data.get("personName") || "Not provided"}`,
      `County: ${selectedCounty} County`,
      `Resource or facility: ${selectedFacility?.name || "Please help me confirm the facility"}`,
      `My name: ${data.get("callerName") || "Not provided"}`,
      `Best callback: ${data.get("callback") || "Not provided"}`,
      `Bond amount: ${data.get("bondAmount") || "Not sure"}`,
    ].join("\n");

    const subject = `Custody inquiry — ${selectedCounty} County`;
    setEmailReady(true);
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  useEffect(() => {
    if (!intakeOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeIntake();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [intakeOpen]);

  return (
    <section className={`coverage-section ${compact ? "coverage-compact" : ""}`} id="coverage">
      <div className="coverage-copy">
        <h2>{compact ? "Serving all 56 Montana counties" : "Find your Montana county"}</h2>
        <p>
          Search for a county or choose it directly on the map. The highlighted
          boundary shows the county you selected—not an estimated nearby hub.
        </p>
        {compact && (
          <figure className="coverage-landmark">
            <img
              src="/images/regions/northwest-bail-bonds-glacier-wild-goose-island.png"
              alt="Wild Goose Island on Saint Mary Lake in Glacier National Park, representing Northwest Bail Bonds' Missoula, Kalispell, and Western Montana service area."
              title="Missoula, Kalispell & Western Montana Service Area"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Glacier National Park · Western Montana</figcaption>
          </figure>
        )}
        <div className="selected-place" aria-live="polite">
          <span>County selected</span>
          <strong>{selectedCounty} County</strong>
          <small>{selectedCounty === "Yellowstone" ? "Billings home county" : "Montana statewide service area"}</small>
        </div>
        <a className="coverage-call" href={`tel:${PHONE_LINK}`}>Ask about {selectedCounty} County <span>→</span></a>
      </div>

      <div className="map-panel">
        <div className="montana-map">
          <svg viewBox="0 0 900 480" role="img" aria-labelledby="map-title map-description">
            <title id="map-title">Interactive map of Montana counties</title>
            <desc id="map-description">All 56 Montana county boundaries. Choose a county to highlight it and confirm the service area.</desc>
            <path className="state-outline" d={MONTANA_STATE_OUTLINE} />
            <g className="county-shapes">
              {MONTANA_COUNTY_PATHS.map((county) => (
                <path
                  key={county.fips}
                  className={selectedCounty === county.name ? "county-shape active" : "county-shape"}
                  d={county.path ?? undefined}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${county.name} County`}
                  aria-pressed={selectedCounty === county.name}
                  onClick={() => chooseCounty(county.name as CountyName)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      chooseCounty(county.name as CountyName);
                    }
                  }}
                />
              ))}
            </g>
          </svg>
          <span className="map-caption">County boundaries from U.S. Census cartographic data</span>
        </div>

        <div className="county-search">
          <label htmlFor="county-search">Find your Montana county</label>
          <div className="county-search-row">
            <input
              id="county-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Yellowstone, Gallatin, Missoula…"
              autoComplete="off"
            />
            {(query || selectedCounty !== "Yellowstone") && (
              <button type="button" className="clear-county" onClick={() => { chooseCounty("Yellowstone"); setQuery(""); }}>
                Reset
              </button>
            )}
          </div>
          <div className="county-results" aria-live="polite">
            {!query.trim() && <p>Type a county name or choose one of the 56 county shapes above.</p>}
            {query.trim() && matches.length > 0 && matches.map((county) => (
              <button
                type="button"
                key={county}
                className={selectedCounty === county ? "active" : ""}
                onClick={() => chooseCounty(county)}
              >
                <strong>{county} County</strong>
                <span>Show on map</span>
              </button>
            ))}
            {query.trim() && !matches.length && <p>No county match. Call {PHONE_DISPLAY} and we can help identify the location.</p>}
          </div>
        </div>

        <div className="detention-directory" aria-live="polite">
          <div className="detention-heading">
            <div>
              <span>Selected county</span>
              <h3>Jail and detention resources for {selectedCounty} County</h3>
            </div>
          </div>

          {countyDetention.facilities.length > 0 ? (
            <div className="facility-list" role="radiogroup" aria-label={`Jail and detention resources for ${selectedCounty} County`}>
              {countyDetention.facilities.map((facility) => (
                <article
                  className={selectedFacilityId === facility.id ? "facility-card selected" : "facility-card"}
                  key={facility.id}
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selectedFacilityId === facility.id}
                    onClick={() => setSelectedFacilityId(facility.id)}
                  >
                    <span>{facility.kind}</span>
                    <strong>{facility.name}</strong>
                    {(facility.city || facility.phone) && (
                      <small>
                        {facility.city ? `${facility.city}, Montana` : ""}
                        {facility.city && facility.phone ? " · " : ""}
                        {facility.phone || ""}
                      </small>
                    )}
                    {facility.note && <small>{facility.note}</small>}
                  </button>
                  {(facility.rosterUrl || facility.officialUrl) && (
                    <div className="facility-links">
                      {facility.rosterUrl && (
                        <a href={facility.rosterUrl} target="_blank" rel="noreferrer">Search Current Inmates ↗</a>
                      )}
                      {facility.officialUrl && facility.officialUrl !== facility.rosterUrl && (
                        <a href={facility.officialUrl} target="_blank" rel="noreferrer">{getOfficialLinkLabel(facility)} ↗</a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="facility-routing-note">
              <strong>Facility location needs to be confirmed</strong>
              <p>{countyDetention.routingNote}</p>
            </div>
          )}

          <div className="county-help-cta" id="county-help">
            <div className="county-help-copy">
              <span>Need help now?</span>
              <strong>Get help with a {selectedCounty} County bail bond</strong>
              <p>Call Northwest 24/7 or send the basic details you have. Joel and his team can help confirm the next step.</p>
            </div>
            <div className="county-help-actions">
              <a href={`tel:${PHONE_LINK}`}>Call {PHONE_DISPLAY}</a>
              <button type="button" onClick={openIntake}>Contact Joel now <span>→</span></button>
            </div>
          </div>
          <p className="directory-disclaimer">
            Facility assignments and rosters can change. Confirm custody before relying on this directory.
            Tribal, federal, juvenile, and state-prison custody may follow different release procedures.
          </p>
        </div>
        {compact && <a className="map-more" href="/service-areas">Open the full county guide <span>→</span></a>}
      </div>

      {intakeOpen && (
        <div
          className="custody-intake-backdrop"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeIntake();
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeIntake();
          }}
        >
          <section
            className="custody-intake"
            role="dialog"
            aria-modal="true"
            aria-labelledby="custody-intake-title"
            aria-describedby="custody-intake-description"
          >
            <button className="custody-intake-close" type="button" onClick={closeIntake} aria-label="Close custody inquiry form">×</button>
            <div className="custody-intake-heading">
              <span>Email Northwest</span>
              <h2 id="custody-intake-title">Ask about someone in custody</h2>
              <p id="custody-intake-description">
                Tell us who is in custody. Northwest can help confirm the county, facility, and next step.
              </p>
            </div>
            <div className="custody-intake-location">
              <span>County</span>
              <strong>{selectedCounty} County</strong>
              <span>Resource / facility</span>
              <strong>{selectedFacility?.name || "To be confirmed by Northwest"}</strong>
            </div>
            <form onSubmit={prepareEmail}>
              <label>
                Person&apos;s full legal name
                <input ref={firstFieldRef} name="personName" autoComplete="off" required placeholder="First and last name" />
              </label>
              <div className="custody-intake-row">
                <label>
                  Your name <small>Optional</small>
                  <input name="callerName" autoComplete="name" placeholder="First and last name" />
                </label>
                <label>
                  Best callback number
                  <input name="callback" type="tel" autoComplete="tel" required placeholder="(406) 555-0000" />
                </label>
              </div>
              <label>
                Bond amount <small>Optional</small>
                <input name="bondAmount" inputMode="decimal" placeholder="It’s okay if you don’t know" />
              </label>
              <button type="submit">Ask Northwest for help <span>→</span></button>
              <p className="custody-intake-privacy" aria-live="polite">
                {emailReady
                  ? "Review your message, then send it when you are ready."
                  : "Do not include charges, Social Security numbers, banking details, or other sensitive information."}
              </p>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
