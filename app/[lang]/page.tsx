import { notFound, permanentRedirect } from "next/navigation";
import { SLUG_TO_COUNTRY } from "@/lib/guideConfig";

interface Props {
  params: { lang: string };
}

// Handles legacy slug URLs like /japan-payment-guide → redirect to canonical route
export default function LegacySlugOrLangPage({ params }: Props) {
  const country = SLUG_TO_COUNTRY[params.lang];
  if (country) {
    permanentRedirect(`/en/how-to-pay/${country}`);
  }
  notFound();
}
