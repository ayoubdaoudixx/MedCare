"use client";

import { useState, useCallback } from "react";
import { I18nProvider } from "@/lib/i18n-context";
import { IntroSplash } from "@/components/intro-splash";
import { INTRO_DONE_EVENT } from "@/components/chatbot/MedcareChatbot";
import { Topbar } from "@/components/topbar";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { EmergencyBand } from "@/components/emergency-band";
import { Steps } from "@/components/steps";
import { WhyUs } from "@/components/why-us";
import { Coverage } from "@/components/coverage";
import { Testimonials } from "@/components/testimonials";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

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
