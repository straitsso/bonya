import { site } from "@content/site";
import { ButtonLink } from "./Button";
import { Label } from "./Label";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** Dark closing band: enquire or book a call. */
export function CtaBand({
  title = "Begin with a conversation",
  body = "Tell us about your garden and how you would like to use it. We will come back to you within two working days.",
  enquireHref = "/enquire",
}: {
  title?: string;
  body?: string;
  enquireHref?: string;
}) {
  return (
    <Section tone="ink" width="narrow" aria-labelledby="cta-heading">
      <Reveal className="text-center">
        <Label className="text-paper/70">Enquire</Label>
        <h2 id="cta-heading" className="mt-4 text-headline">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-paper/75">{body}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={enquireHref} variant="paper">
            Make an enquiry
          </ButtonLink>
          <ButtonLink href={site.booking.call} variant="light" external>
            Book a call
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
