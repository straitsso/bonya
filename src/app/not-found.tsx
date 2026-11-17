import { ButtonLink } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";

export default function NotFound() {
  return (
    <div className="pb-32">
      <PageHeader label="404" title="This page has wandered off">
        <p>It may have moved, or never existed. Let&rsquo;s get you somewhere warmer.</p>
      </PageHeader>
      <div className="flex justify-center">
        <ButtonLink href="/">Return home</ButtonLink>
      </div>
    </div>
  );
}
