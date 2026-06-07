"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import { Separator } from "@/components/ui/separator";
import { AppIcon } from "@/components/app-icon";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./social-icons";

const socials = [
  { name: "Facebook", Icon: FacebookIcon, href: "#" },
  { name: "Instagram", Icon: InstagramIcon, href: "#" },
  { name: "LinkedIn", Icon: LinkedInIcon, href: "#" },
  { name: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/212600000000" },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-brand-deep text-white pt-16 pb-6">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Image src="/medcare-logo.png" alt="MEDCARE" width={140} height={36} className="h-9 w-auto mb-4 brightness-0 invert" />
            <p className="text-brand-xlight/70 text-sm leading-relaxed mb-5">{t("ft_about")}</p>
            <div className="flex gap-3">
              {socials.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="group w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:-translate-y-0.5 transition-all duration-300 text-brand-xlight hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base mb-4">{t("ft_services")}</h4>
            <ul className="space-y-2.5">
              {["s1_t", "s2_t", "s3_t", "s5_t", "s7_t"].map((key) => (
                <li key={key}>
                  <a href="#" className="text-brand-xlight/70 text-sm hover:text-white transition-colors">
                    {t(key as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base mb-4">{t("ft_company")}</h4>
            <ul className="space-y-2.5">
              {["ft_about_link", "ft_team", "ft_careers", "ft_partners", "ft_blog"].map((key) => (
                <li key={key}>
                  <a href="#" className="text-brand-xlight/70 text-sm hover:text-white transition-colors">
                    {t(key as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base mb-4">{t("ft_contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-brand-xlight/70 text-sm">
                <AppIcon name="MapPin" className="w-4 h-4 mt-0.5 shrink-0 text-brand-xlight" />
                <span>{t("ft_addr")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <AppIcon name="Phone" className="w-4 h-4 shrink-0 text-brand-xlight" />
                <a href="tel:+212522000000" className="text-brand-xlight/70 hover:text-white transition-colors">
                  {t("ft_phone")}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <AppIcon name="Mail" className="w-4 h-4 shrink-0 text-brand-xlight" />
                <a href="mailto:contact@medcare.ma" className="text-brand-xlight/70 hover:text-white transition-colors">
                  {t("ft_email")}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-brand-xlight/70 text-sm">
                <AppIcon name="Clock" className="w-4 h-4 shrink-0 text-brand-xlight" />
                <span>{t("tb_hours")}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-brand-xlight/50 text-sm">
          <span>{t("ft_rights")}</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">{t("ft_legal")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("ft_privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
