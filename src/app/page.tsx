"use client";

import { useState, useCallback } from "react";
import { I18nProvider } from "@/lib/i18n-context";
import { IntroSplash } from "@/components/sections/intro-splash";
import { INTRO_DONE_EVENT } from "@/components/chatbot/medcare-chatbot";
import { Topbar } from "@/components/sections/topbar";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { EmergencyBand } from "@/components/sections/emergency-band";
import { Steps } from "@/components/sections/steps";
import { WhyUs } from "@/components/sections/why-us";
import { Coverage } from "@/components/sections/coverage";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    if (typeof window !== "undefined") {
      window.__medcareIntroDone = true;
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    }
  }, []);

  return (
    <I18nProvider>
      {!introDone && <IntroSplash onComplete={handleIntroComplete} />}
      <Topbar />
      <Header />
      <main>
        <Hero />
        <Services />
        <EmergencyBand />
        <Steps />
        <WhyUs />
        <Coverage />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </I18nProvider>
  );
}
