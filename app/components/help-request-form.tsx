"use client";

import { FormEvent, useState } from "react";
import { EMAIL_ADDRESS } from "@/app/lib/site";

export function HelpRequestForm() {
  const [emailReady, setEmailReady] = useState(false);

  function sendHelpRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello Northwest Bail Bonds — I need help with a Montana Bail Bond.",
      `My name: ${data.get("contactName") || "Not provided"}`,
      `Best callback: ${data.get("phone") || "Not provided"}`,
      `Person in custody: ${data.get("defendantName") || "Not provided"}`,
      `County / facility: ${data.get("location") || "Not sure"}`,
      `Bond amount: ${data.get("amount") || "Not sure"}`,
    ].join("\n");

    const subject = "Montana Bail Bond inquiry";
    setEmailReady(true);
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  return (
    <form className="help-form" onSubmit={sendHelpRequest}>
      <div className="field-row">
        <label>Your name<input name="contactName" autoComplete="name" placeholder="First and last name" /></label>
        <label>Your callback number<input name="phone" type="tel" autoComplete="tel" placeholder="(406) 555-0000" required /></label>
      </div>
      <label>Person in custody<input name="defendantName" placeholder="Full name" /></label>
      <label>County or detention facility<input name="location" placeholder="Example: Yellowstone County" /></label>
      <label>Bond amount, if known<input name="amount" inputMode="decimal" placeholder="It’s okay if you don’t know" /></label>
      <button type="submit">Ask Northwest for help <span>→</span></button>
      <p aria-live="polite">
        {emailReady
          ? "Review your message, then send it when you are ready."
          : "Please leave out Social Security numbers and financial account details."}
      </p>
    </form>
  );
}
