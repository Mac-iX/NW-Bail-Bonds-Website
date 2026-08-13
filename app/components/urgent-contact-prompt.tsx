"use client";

import { useEffect, useState } from "react";
import { EMAIL_ADDRESS, PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";

const DISMISSED_KEY = "northwest-urgent-contact-dismissed";

export function UrgentContactPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISSED_KEY) === "true") return;
    } catch {
      // The prompt still works when browser storage is unavailable.
    }

    let timer = 0;
    function reveal() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", revealAfterScroll);
      setVisible(true);
    }
    function revealAfterScroll() {
      if (window.scrollY >= 220) {
        reveal();
      }
    }
    timer = window.setTimeout(reveal, 4500);

    window.addEventListener("scroll", revealAfterScroll, { passive: true });
    revealAfterScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", revealAfterScroll);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Dismissal still applies until the next page load.
    }
  }

  return (
    <aside
      className={`urgent-contact-prompt${visible ? " is-visible" : ""}`}
      aria-labelledby="urgent-contact-title"
      aria-hidden={!visible}
      inert={!visible}
    >
      <button className="urgent-contact-close" type="button" onClick={dismiss} aria-label="Dismiss urgent contact prompt">
        <span aria-hidden="true">×</span>
      </button>
      <div className="urgent-contact-copy">
        <strong id="urgent-contact-title">Need a Bail Bondsman right now?</strong>
        <span>Call Northwest directly. Available 24/7 throughout Montana.</span>
      </div>
      <div className="urgent-contact-actions">
        <a className="urgent-contact-call" href={`tel:${PHONE_LINK}`}>Call {PHONE_DISPLAY}</a>
        <a className="urgent-contact-text" href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20help`}>Email Northwest</a>
      </div>
    </aside>
  );
}
