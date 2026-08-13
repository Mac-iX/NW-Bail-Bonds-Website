import { HelpRequestForm } from "@/app/components/help-request-form";
import { PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";

type InquirySectionProps = {
  title: string;
  intro: string;
  id?: string;
};

export function InquirySection({ title, intro, id = "request-help" }: InquirySectionProps) {
  return (
    <section className="process-intake-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="process-intake-copy">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
        <a href={`tel:${PHONE_LINK}`}>Call {PHONE_DISPLAY}</a>
      </div>
      <HelpRequestForm />
    </section>
  );
}
