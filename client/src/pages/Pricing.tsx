/**
 * Pricing Page — Config-Driven
 *
 * Shown after the ROI quiz. Contains pricing tiers, FAQ, and CTA.
 * All content from config.
 *
 * Design: Deep navy (#10264c) + warm cream (#f5efe6) + electric teal (#75e0f3)
 */

import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { config } from "@/config";
import { getIcon } from "@/config/icons";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#d0c4b7]/60">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-semibold text-[#10264c] pr-4">{q}</span>
        <span className={`text-[#75e0f3] transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-[#5f6f88] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pricingSection = useReveal();
  const faqSection = useReveal();
  const ctaSection = useReveal();

  const { brand, pricing } = config;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[#d0c4b7]/60" style={{ backgroundColor: "rgba(254,254,254,0.92)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <span className="font-heading text-3xl sm:text-4xl font-normal tracking-tight select-none leading-none" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              <span className="text-[#10264c]">{brand.name} </span>
              <span className="text-[#75e0f3]">{brand.accent}</span>
            </span>
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#10264c]/60 select-none mt-0.5">
              {brand.tagline}
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#10264c]/70">
            <button onClick={() => navigate("/")} className="hover:text-[#10264c] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <a href="#pricing" className="hover:text-[#10264c] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#10264c] transition-colors">FAQ</a>
            <button data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#10264c] text-white text-sm font-semibold hover:bg-[#1a3366] transition-colors">
              Get Started
            </button>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f5efe6] transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#10264c]" /> : <Menu className="w-5 h-5 text-[#10264c]" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#d0c4b7]/60 bg-[#fefefe] px-6 py-4 space-y-3">
            <button onClick={() => { navigate("/"); setMobileMenuOpen(false); }} className="flex items-center gap-1 text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">FAQ</a>
            <button data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl bg-[#10264c] text-white text-sm font-semibold hover:bg-[#1a3366] transition-colors">Get Started</button>
          </div>
        )}
      </header>

      <main>
        {/* ═══ HERO BANNER ═══ */}
        <section className="py-16 sm:py-20 px-6 bg-[#10264c] text-center relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-10" style={{ background: "#75e0f3" }} />
          <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-8" style={{ background: "#d0c4b7" }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#75e0f3] mb-4">{pricing.heroLabel}</p>
            <h1 className="font-heading text-4xl sm:text-6xl text-[#fefefe] mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {pricing.heroHeadline}
            </h1>
            <p className="text-[#fefefe]/70 text-lg max-w-2xl mx-auto">
              {pricing.heroSubheadline}
            </p>
          </div>
        </section>

        {/* ═══ PRICING CARDS ═══ */}
        <section id="pricing" className="py-16 sm:py-24 px-6 bg-[#fefefe]">
          <div ref={pricingSection.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${pricingSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricing.tiers.map((tier) => {
                const Icon = getIcon(tier.iconName);
                if (tier.featured) {
                  return (
                    <div key={tier.title} className="rounded-3xl border-2 border-[#10264c] bg-[#10264c] p-8 text-[#fefefe] shadow-xl shadow-[#10264c]/15 relative">
                      {tier.featuredBadge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#75e0f3] text-[#10264c] text-xs font-bold uppercase tracking-wider">
                          {tier.featuredBadge}
                        </div>
                      )}
                      <div className="w-12 h-12 rounded-2xl bg-[#75e0f3] flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6 text-[#10264c]" />
                      </div>
                      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#fefefe]/60 mb-2">{tier.label}</p>
                      <h3 className="font-heading text-2xl text-[#fefefe] mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{tier.title}</h3>
                      <p className="text-3xl font-bold text-[#75e0f3] mb-4">
                        {tier.price}
                        {tier.priceSuffix && <span className="text-lg font-normal text-[#fefefe]/50">{tier.priceSuffix}</span>}
                      </p>
                      <p className="text-[#fefefe]/70 leading-relaxed text-[15px] mb-6">{tier.description}</p>
                      <button data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="block w-full text-center py-3 rounded-xl bg-[#75e0f3] text-[#10264c] font-bold hover:brightness-95 transition-all duration-200">
                        {tier.ctaLabel}
                      </button>
                    </div>
                  );
                }
                return (
                  <div key={tier.title} className="rounded-3xl border border-[#d0c4b7]/60 bg-white p-8 hover:shadow-xl hover:shadow-[#10264c]/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-[#f5efe6] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[#10264c]" />
                    </div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#5f6f88] mb-2">{tier.label}</p>
                    <h3 className="font-heading text-2xl text-[#10264c] mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{tier.title}</h3>
                    <p className="text-3xl font-bold text-[#10264c] mb-4">
                      {tier.price}
                      {tier.priceSuffix && <span className="text-lg font-normal text-[#5f6f88]">{tier.priceSuffix}</span>}
                    </p>
                    <p className="text-[#5f6f88] leading-relaxed text-[15px] mb-6">{tier.description}</p>
                    <button data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="block w-full text-center py-3 rounded-xl border-2 border-[#10264c] text-[#10264c] font-semibold hover:bg-[#10264c] hover:text-white transition-all duration-200">
                      {tier.ctaLabel}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="py-16 sm:py-24 px-6 bg-[#f3efe8]">
          <div ref={faqSection.ref} className={`max-w-2xl mx-auto transition-all duration-700 ${faqSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="font-heading text-3xl sm:text-5xl text-center text-[#10264c] mb-10 sm:mb-16" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              Questions & answers
            </h2>
            <div className="space-y-3">
              {pricing.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-16 sm:py-24 px-6 bg-[#fefefe]">
          <div ref={ctaSection.ref} className={`max-w-xl mx-auto transition-all duration-700 ${ctaSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="rounded-3xl bg-[#10264c] p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-15 bg-[#75e0f3] pointer-events-none" />
              <h2 className="font-heading text-3xl sm:text-4xl text-[#fefefe] mb-4 relative z-10" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                {pricing.ctaHeadline}
              </h2>
              <p className="text-[#fefefe]/70 mb-8 max-w-md mx-auto relative z-10">
                {pricing.ctaSubheadline}
              </p>
              <button
                data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-[#75e0f3] text-[#10264c] font-bold text-lg hover:brightness-95 active:scale-[0.98] transition-all duration-200 relative z-10"
              >
                Book Your Audit
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[#fefefe]/50 relative z-10">
                <span>No contracts</span>
                <span className="text-[#fefefe]/20">|</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#10264c] text-[#fefefe] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-heading text-2xl font-normal tracking-tight select-none" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              <span className="text-[#fefefe]">{brand.name} </span>
              <span className="text-[#75e0f3]">{brand.accent}</span>
            </span>
            <p className="text-[#fefefe]/55 text-sm mt-1">{brand.footerDesc}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#fefefe]/65">
            <button data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="hover:text-white transition-colors">Book a Call</button>
            <button onClick={() => navigate("/")} className="hover:text-white transition-colors">Home</button>
          </div>
          <p className="text-[#fefefe]/40 text-sm">© 2026 AutoM8</p>
        </div>
      </footer>
    </div>
  );
}
