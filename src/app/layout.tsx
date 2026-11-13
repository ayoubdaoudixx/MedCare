import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { MedcareChatbot } from "@/components/chatbot/medcare-chatbot";

// Fraunces carries the headlines, Figtree the interface and body text.
// IBM Plex Sans Arabic sits in both font stacks, so Arabic glyphs fall back
// to it automatically wherever they appear.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedCare · Ambulance, médecin et soins à domicile à Casablanca",
  description:
    "Ambulance, médecin, infirmier et garde-malade à domicile. MedCare se déplace à Casablanca et dans sa région, 24h/24 et 7j/7. Devis gratuit.",
};

export const viewport: Viewport = {
  themeColor: "#F8FAFD",
  viewportFit: "cover",
};

// Runs before first paint: a visitor who already saw the intro in this
// session goes straight to the page.
const introSeenScript = `try{if(sessionStorage.getItem("medcare-intro"))document.documentElement.classList.add("intro-seen")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${figtree.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introSeenScript }} />
      </head>
      <body>
        {children}
        <MedcareChatbot />
      </body>
    </html>
  );
}
