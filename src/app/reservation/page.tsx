import type { Metadata } from "next";

import { I18nProvider } from "@/lib/i18n-context";
import { Topbar } from "@/components/topbar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReservationForm } from "@/components/reservation/reservation-form";

export const metadata: Metadata = {
  title: "Réserver un rendez-vous — MEDCARE",
  description: "Réservez votre prestation médicale à domicile en quelques clics.",
};

export default function ReservationPage() {
  return (
    <I18nProvider>
      <Topbar />
      <Header />
      <main className="min-h-screen py-12 lg:py-20 bg-surface">
        <ReservationForm />
      </main>
      <Footer />
    </I18nProvider>
  );
}
