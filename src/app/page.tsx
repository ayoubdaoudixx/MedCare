"use client";

import { useCallback, useState } from "react";
import { I18nProvider } from "@/lib/i18n-context";
import { IntroSplash } from "@/components/sections/intro-splash";
import { INTRO_DONE_EVENT } from "@/components/chatbot/medcare-chatbot";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { Services } from "@/components/sections/services";
import { EmergencyBand } from "@/components/sections/emergency-band";
import { Steps } from "@/components/sections/steps";
import { WhyUs } from "@/components/sections/why-us";
import { Coverage } from "@/components/sections/coverage";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { MobileCallBar } from "@/components/sections/mobile-call-bar";

export default function Home() {
  // `revealed`: the intro has started to lift, the hero can animate in.
  // `introDone`: the intro is gone and can be unmounted.
  const [revealed, setRevealed] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    window.__medcareIntroDone = true;
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, []);

  return (
    <I18nProvider>
      {!introDone && <IntroSplash onReveal={handleReveal} onComplete={handleIntroComplete} />}
      <Header />
      <main id="contenu">
        <Hero ready={revealed} />
        <Statement />
        <Services />
        <EmergencyBand />
        <Steps />
        <WhyUs />
        <Coverage />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCallBar />
    </I18nProvider>
  );
}
