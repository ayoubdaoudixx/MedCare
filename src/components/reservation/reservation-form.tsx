"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import { AppIcon } from "@/components/app-icon";

const serviceKeys = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"] as const;

export function ReservationForm() {
  const { t, dir } = useI18n();
  const [formData, setFormData] = useState({
    callerName: "",
    phone: "",
    email: "",
    cin: "",
    patientName: "",
    dob: "",
    service: "",
    description: "",
    urgent: "no",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-[700px] mx-auto px-5 w-full animate-in fade-in zoom-in duration-500">
        <div className="glass rounded-[32px] p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full bg-tint flex items-center justify-center mx-auto mb-8 shadow-brand-glow bg-gradient-to-br from-brand to-brand-dark animate-float">
              <AppIcon name="ShieldCheck" className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-[clamp(28px,4vw,40px)] font-['Plus_Jakarta_Sans'] font-extrabold text-ink mb-4 text-gradient-brand">
              Réservation confirmée
            </h2>
            <p className="text-ink-soft text-[clamp(16px,2vw,18px)] mb-10 max-w-lg mx-auto leading-relaxed">
              Merci pour votre confiance. Notre équipe médicale vous contactera dans les plus brefs délais pour valider votre intervention.
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="inline-flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans'] font-bold text-[16px] bg-white border border-line-2 text-brand-dark px-10 py-4.5 rounded-full hover:bg-tint transition-all shadow-soft hover:-translate-y-1"
            >
              <AppIcon name="Home" className="w-5 h-5" />
              {t("nav_home")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isRtl = dir === 'rtl';
  const paddingIcon = isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4';
  const iconPos = isRtl ? 'right-4' : 'left-4';

  return (
    <div className="max-w-[840px] mx-auto px-5 w-full relative">
      {/* Decorative background blurs */}
      <div className="absolute -start-32 -top-32 w-96 h-96 rounded-full bg-brand/10 blur-3xl animate-aurora pointer-events-none" />
      <div className="absolute -end-32 top-64 w-96 h-96 rounded-full bg-brand-light/10 blur-3xl animate-aurora-slow pointer-events-none" />

      <div className="text-center mb-10 lg:mb-14 relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-line-2 px-4 py-2.5 rounded-full text-[13px] font-['Plus_Jakarta_Sans'] font-extrabold tracking-[0.14em] uppercase text-brand-dark mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_0_4px_var(--color-tint-2)] animate-pulse" />
          <span>Réservation Rapide</span>
        </span>
        <h1 className="text-[clamp(32px,5vw,52px)] font-['Plus_Jakarta_Sans'] font-extrabold text-ink mb-5 leading-tight">
          {t("res_title" as any)}
        </h1>
        <p className="text-muted-text text-[clamp(16px,2vw,18px)] max-w-2xl mx-auto leading-relaxed">
          {t("res_desc" as any)}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-10 relative z-10"
      >
        {/* SECTION 1: Personal Info */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-tint flex items-center justify-center shrink-0">
              <AppIcon name="Users" className="w-5 h-5 text-brand" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-ink text-[19px]">Informations Contact</h3>
            <div className={`flex-1 h-[1px] bg-gradient-to-r from-line-2 to-transparent ${isRtl ? 'mr-4' : 'ml-4'}`}></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <label htmlFor="callerName" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
                {t("res_caller_name" as any)} <span className="text-emergency">*</span>
              </label>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 ${iconPos}`}>
                  <AppIcon name="Users" className="w-[22px] h-[22px]" />
                </div>
                <input
                  type="text"
                  id="callerName"
                  name="callerName"
                  required
                  value={formData.callerName}
                  onChange={handleChange}
                  className={`w-full bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm ${paddingIcon}`}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label htmlFor="phone" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
                {t("res_phone" as any)} <span className="text-emergency">*</span>
              </label>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 ${iconPos}`}>
                  <AppIcon name="Phone" className="w-[22px] h-[22px]" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  dir="ltr"
                  className={`w-full bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm ${isRtl ? 'pr-12 pl-4 text-end' : 'pl-12 pr-4'}`}
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2.5">
              <label htmlFor="email" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
                {t("res_email" as any)}
              </label>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 ${iconPos}`}>
                  <AppIcon name="Mail" className="w-[22px] h-[22px]" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  dir="ltr"
                  className={`w-full bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm ${isRtl ? 'pr-12 pl-4 text-end' : 'pl-12 pr-4'}`}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label htmlFor="cin" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
                {t("res_cin" as any)}
              </label>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 ${iconPos}`}>
                  <AppIcon name="FileText" className="w-[22px] h-[22px]" />
                </div>
                <input
                  type="text"
                  id="cin"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  className={`w-full bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm ${paddingIcon}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Patient Info */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-tint flex items-center justify-center shrink-0">
              <AppIcon name="HeartPulse" className="w-5 h-5 text-brand" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-ink text-[19px]">Détails du Patient</h3>
            <div className={`flex-1 h-[1px] bg-gradient-to-r from-line-2 to-transparent ${isRtl ? 'mr-4' : 'ml-4'}`}></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <label htmlFor="patientName" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
                {t("res_patient_name" as any)} <span className="text-emergency">*</span>
              </label>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 ${iconPos}`}>
                  <AppIcon name="Users" className="w-[22px] h-[22px]" />
                </div>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  required
                  value={formData.patientName}
                  onChange={handleChange}
                  className={`w-full bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm ${paddingIcon}`}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label htmlFor="dob" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
                {t("res_dob" as any)} <span className="text-emergency">*</span>
              </label>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 ${iconPos}`}>
                  <AppIcon name="Calendar" className="w-[22px] h-[22px]" />
                </div>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm font-sans ${paddingIcon}`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 mt-6">
            <label htmlFor="service" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
              {t("res_service" as any)} <span className="text-emergency">*</span>
            </label>
            <div className="relative group">
              <div className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 pointer-events-none ${iconPos}`}>
                <AppIcon name="Stethoscope" className="w-[22px] h-[22px]" />
              </div>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className={`w-full appearance-none bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm ${paddingIcon}`}
              >
                <option value="" disabled>---</option>
                {serviceKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`${key}_t` as any)}
                  </option>
                ))}
              </select>
              <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${isRtl ? 'left-5' : 'right-5'}`}>
                <AppIcon name="ChevronDown" className="w-5 h-5 text-muted-text" />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 mt-6">
            <label htmlFor="description" className="block text-[14px] font-['Plus_Jakarta_Sans'] font-bold text-ink-soft">
              {t("res_desc_case" as any)} <span className="text-emergency">*</span>
            </label>
            <div className="relative group">
              <div className={`absolute top-4 flex items-center justify-center text-muted-text group-focus-within:text-brand transition-colors duration-300 ${iconPos}`}>
                <AppIcon name="Chat" className="w-[22px] h-[22px]" />
              </div>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full bg-white/60 border border-line-2 rounded-2xl py-3.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand focus:bg-white transition-all shadow-sm resize-y min-h-[120px] ${paddingIcon}`}
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 3: Urgency */}
        <div className="bg-gradient-to-br from-surface to-white border border-line-2 rounded-[24px] p-6 lg:p-8 shadow-sm">
          <label className="block text-[17px] font-['Plus_Jakarta_Sans'] font-bold text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emergency-tint flex items-center justify-center">
              <AppIcon name="Zap" className="w-4 h-4 text-emergency" />
            </div>
            {t("res_urgent" as any)}
          </label>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              formData.urgent === 'yes' 
                ? 'border-emergency bg-emergency-tint/50 shadow-[0_12px_24px_-8px_rgba(230,58,75,0.25)]' 
                : 'border-line-2 bg-white hover:border-emergency/30 hover:bg-surface'
            }`}>
              <input
                type="radio"
                name="urgent"
                value="yes"
                checked={formData.urgent === "yes"}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isRtl ? 'ml-4' : 'mr-4'} ${
                formData.urgent === 'yes' 
                  ? 'bg-emergency text-white shadow-[0_0_15px_rgba(230,58,75,0.4)] scale-110' 
                  : 'bg-tint text-muted-text'
              }`}>
                <AppIcon name="Siren" className="w-6 h-6" />
              </div>
              <div>
                <span className={`block font-['Plus_Jakarta_Sans'] font-bold text-[16px] transition-colors ${
                  formData.urgent === 'yes' ? 'text-emergency-dark' : 'text-ink'
                }`}>{t("res_yes" as any)}</span>
                <span className="block text-[13px] text-muted-text mt-1">Intervention immédiate requise</span>
              </div>
              <div className={`absolute w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isRtl ? 'left-5' : 'right-5'} ${
                formData.urgent === 'yes' ? 'border-emergency' : 'border-line-2'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-emergency transition-transform duration-300 ${
                  formData.urgent === 'yes' ? 'scale-100' : 'scale-0'
                }`}></div>
              </div>
            </label>

            <label className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              formData.urgent === 'no' 
                ? 'border-brand bg-tint-2 shadow-[0_12px_24px_-8px_rgba(16,128,176,0.2)]' 
                : 'border-line-2 bg-white hover:border-brand/30 hover:bg-surface'
            }`}>
              <input
                type="radio"
                name="urgent"
                value="no"
                checked={formData.urgent === "no"}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isRtl ? 'ml-4' : 'mr-4'} ${
                formData.urgent === 'no' 
                  ? 'bg-brand text-white shadow-[0_0_15px_rgba(16,128,176,0.3)] scale-110' 
                  : 'bg-tint text-muted-text'
              }`}>
                <AppIcon name="Calendar" className="w-6 h-6" />
              </div>
              <div>
                <span className={`block font-['Plus_Jakarta_Sans'] font-bold text-[16px] transition-colors ${
                  formData.urgent === 'no' ? 'text-brand-dark' : 'text-ink'
                }`}>{t("res_no" as any)}</span>
                <span className="block text-[13px] text-muted-text mt-1">Planifier pour plus tard</span>
              </div>
              <div className={`absolute w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isRtl ? 'left-5' : 'right-5'} ${
                formData.urgent === 'no' ? 'border-brand' : 'border-line-2'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-brand transition-transform duration-300 ${
                  formData.urgent === 'no' ? 'scale-100' : 'scale-0'
                }`}></div>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex items-center justify-center gap-3 font-['Plus_Jakarta_Sans'] font-bold text-[17px] bg-gradient-to-r from-brand to-brand-dark text-white px-8 py-5 rounded-2xl shadow-brand-glow hover:-translate-y-1 hover:shadow-[0_24px_50px_-12px_rgba(16,128,176,0.6)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            {/* Sheen effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            
            {isSubmitting ? (
              <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <AppIcon name="CalendarHeart" className="w-6 h-6" />
                <span>{t("res_submit" as any)}</span>
              </>
            )}
          </button>
          <p className="text-center text-[13px] text-muted-text mt-4 flex items-center justify-center gap-1.5">
            <AppIcon name="ShieldCheck" className="w-4 h-4 text-brand" />
            Vos données sont protégées et sécurisées.
          </p>
        </div>
      </form>
    </div>
  );
}
