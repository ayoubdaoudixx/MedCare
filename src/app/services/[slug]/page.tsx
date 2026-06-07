import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { I18nProvider } from "@/lib/i18n-context";
import { Topbar } from "@/components/topbar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ServicePage } from "@/components/services/service-page";
import { getService, services } from "@/lib/services-data";

// Pre-render all 9 service pages at build time.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

// Only the slugs above are valid routes.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service introuvable — MEDCARE" };
  }

  const title = `${service.name} — MEDCARE`;
  const description = `${service.tagline} MEDCARE intervient partout au Maroc, 24h/24 et 7j/7.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <I18nProvider>
      <Topbar />
      <Header />
      <ServicePage service={service} />
      <Footer />
    </I18nProvider>
  );
}
