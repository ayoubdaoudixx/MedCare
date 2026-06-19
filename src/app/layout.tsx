import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Tajawal } from "next/font/google";
import "./globals.css";
import { MedcareChatbot } from "@/components/chatbot/medcare-chatbot";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "MEDCARE — Assistance médicale & soins à domicile au Maroc",
  description:
    "Ambulances, médecins, infirmiers et soins à domicile partout au Maroc. Disponible 24h/24, 7j/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${manrope.variable} ${tajawal.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <MedcareChatbot />
      </body>
    </html>
  );
}
