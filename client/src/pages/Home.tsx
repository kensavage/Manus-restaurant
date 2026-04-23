/**
 * Home Page — Config-Driven Industry Landing Page
 *
 * Design: Deep navy (#10264c) + warm cream (#f5efe6) + electric teal (#75e0f3)
 * Typography: DM Serif Display headings + Plus Jakarta Sans body
 *
 * All industry-specific content is read from the config.
 */

import { useState, useEffect, useRef } from "react";
import { config } from "@/config";
import { getIcon } from "@/config/icons";
import RoiQuiz from "@/components/RoiQuiz";
import {
  Check,
  ArrowRight,
  Zap,
  Menu,
  X,
  TrendingUp,
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

/* ─── Counter animation hook ─── */
function useCounter(end: number, duration = 2000, start = 0, trigger = true) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start, trigger]);
  return value;
}

/* ─── FAQ Accordion ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#d0c4b7]/50 bg-white overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#f5efe6]/50 transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="text-lg font-medium text-[#10264c] leading-snug">{q}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#10264c]/10 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#10264c]">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[#5f6f88] leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Scroll-reveal refs */
  const contentService = useReveal();
  const problemSection = useReveal();
  const appointmentService = useReveal();
  const practiceStory = useReveal();
  const faqSection = useReveal();
  const ctaSection = useReveal();

  /* Animated counter for the problem section — find the "$25,000" stat or use 25000 */
  const noShowCount = useCounter(25000, 2200, 0, problemSection.visible);

  const { brand, hero, servicesOverview, contentService: cs, problem, appointmentService: appt, practiceStory: story, homeFaqs, cta } = config;

  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-50 w-full bg-[#fefefe]/95 backdrop-blur-sm border-b border-[#d0c4b7]/60 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="font-heading text-3xl sm:text-4xl font-normal tracking-tight select-none leading-none" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              <span className="text-[#10264c]">{brand.name} </span>
              <span className="text-[#75e0f3]">{brand.accent}</span>
            </span>
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#10264c]/60 select-none mt-0.5">
              {brand.tagline}
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#10264c]/70">
            <a href="#services" className="hover:text-[#10264c] transition-colors">Services</a>
            <a href="/pricing" className="hover:text-[#10264c] transition-colors">Pricing</a>
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
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">Services</a>
            <a href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">FAQ</a>
            <button data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl bg-[#10264c] text-white text-sm font-semibold hover:bg-[#1a3366] transition-colors">Get Started</button>
          </div>
        )}
      </header>

      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#10264c" }}>
          <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${hero.backgroundImage})`, opacity: 0.15 }} />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-10" style={{ background: "#75e0f3", animation: "glow-drift 8s ease-in-out infinite" }} />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-10" style={{ background: "#d0c4b7", animation: "glow-drift-2 12s ease-in-out infinite" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 85% 65% at 50% 65%, rgba(255,255,255,0.38) 0%, rgba(117,224,243,0.28) 25%, rgba(117,224,243,0.10) 55%, transparent 75%)" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center" style={{ animation: "fade-up 0.8s ease-out both" }}>
            <h1 className="font-heading max-w-4xl mx-auto text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.05] tracking-tight text-[#fefefe] drop-shadow-[0_8px_28px_rgba(0,0,0,0.35)]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {hero.headline}
            </h1>
            <p className="mt-5 sm:mt-6 text-lg sm:text-2xl text-[#fefefe]/90 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" style={{ animation: "fade-up 0.8s ease-out 0.1s both" }}>
              {hero.subheadline}
            </p>
            <div className="mt-8 sm:mt-10" style={{ animation: "fade-up 0.8s ease-out 0.2s both" }}>
              <button
                onClick={() => setQuizOpen(true)}
                className="group relative inline-flex items-center gap-3 h-16 sm:h-[72px] px-8 sm:px-10 rounded-2xl bg-[#75e0f3] text-[#10264c] font-extrabold text-base sm:text-lg hover:brightness-95 active:scale-[0.98] transition-all duration-200 border-2 border-[#75e0f3] ring-2 ring-[#75e0f3]/30 shadow-lg shadow-[#75e0f3]/20"
              >
                {hero.ctaLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <p className="mt-4 text-sm text-[#fefefe]/60">{hero.ctaSub}</p>
            </div>
          </div>
        </section>

        {/* ═══ SERVICES OVERVIEW ═══ */}
        <section id="services" className="py-16 sm:py-24 px-6 bg-[#fefefe]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#75e0f3] mb-4">{servicesOverview.label}</p>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#10264c] mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {servicesOverview.headline}
            </h2>
            <p className="text-[#5f6f88] text-lg max-w-2xl mx-auto mb-16">
              {servicesOverview.subheadline}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesOverview.cards.map((card) => {
                const Icon = getIcon(card.iconName);
                const isDark = card.variant === "dark";
                return (
                  <a key={card.title} href={card.anchor} className={`group text-left rounded-3xl p-8 sm:p-10 border hover:shadow-xl hover:-translate-y-1 transition-all duration-400 ${isDark ? "bg-[#10264c] border-[#1a3366] hover:shadow-[#10264c]/20" : "bg-[#f5efe6] border-[#d0c4b7]/40 hover:shadow-[#10264c]/5"}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isDark ? "bg-[#75e0f3]" : "bg-[#10264c]"}`}>
                      <Icon className={`w-7 h-7 ${isDark ? "text-[#10264c]" : "text-[#75e0f3]"}`} />
                    </div>
                    <h3 className={`font-heading text-2xl mb-3 ${isDark ? "text-[#fefefe]" : "text-[#10264c]"}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{card.title}</h3>
                    <p className={`leading-relaxed mb-4 ${isDark ? "text-[#fefefe]/70" : "text-[#5f6f88]"}`}>
                      {card.description}
                    </p>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${isDark ? "text-[#75e0f3]" : "text-[#10264c]"}`}>
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ CONTENT SERVICE DETAIL ═══ */}
        <section id="content-service" className="py-16 sm:py-24 px-6 bg-[#f3efe8]">
          <div ref={contentService.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${contentService.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10264c] text-[#75e0f3] text-xs font-semibold tracking-wide uppercase">
                <Zap className="w-3.5 h-3.5" /> {cs.label}
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#10264c] mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {cs.headline}
            </h2>
            <p className="text-[#5f6f88] text-lg max-w-2xl mb-12">
              {cs.subheadline}
            </p>

            <h3 className="font-heading text-2xl text-[#10264c] mb-8" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {cs.howItWorks.map((step) => (
                <div key={step.num} className="relative group rounded-2xl bg-[#d0c4b7] p-8 shadow-sm border border-[#d0c4b7]/50 hover:shadow-xl hover:shadow-[#10264c]/5 hover:-translate-y-1 transition-all duration-400 overflow-hidden">
                  <span className="absolute -top-4 -right-3 font-heading text-[120px] leading-none text-[#10264c]/[0.04] select-none pointer-events-none group-hover:text-[#10264c]/[0.07] transition-colors duration-400" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{step.num}</span>
                  <div className="relative z-10">
                    <h4 className="font-heading text-xl mb-3 text-[#10264c]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{step.title}</h4>
                    <p className="text-[#5f6f88] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#10264c]/10">
              <img src={cs.socialImage} alt={cs.socialImageAlt} className="w-full object-cover" loading="lazy" />
            </div>
            <p className="text-center text-[#5f6f88] mt-4 text-sm">{cs.socialImageCaption}</p>

            {/* Comparison */}
            <div className="mt-16">
              <h3 className="font-heading text-2xl sm:text-3xl text-center text-[#10264c] mb-10" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{cs.comparison.headline}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Without */}
                <div className="rounded-2xl border border-[#d0c4b7]/60 bg-white p-7 sm:p-8">
                  <p className="text-sm uppercase tracking-widest text-[#5f6f88] font-medium mb-6">{cs.comparison.without.label}</p>
                  <div className="space-y-6">
                    {cs.comparison.without.stats.map((stat, i) => (
                      <div key={i}>
                        {i > 0 && <div className="h-px bg-[#d0c4b7]/50 mb-6" />}
                        <p className={`text-4xl sm:text-5xl font-heading ${stat.value === "?" ? "text-[#10264c]/40" : "text-[#10264c]"}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{stat.value}</p>
                        <p className="text-[#5f6f88] mt-1">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* With AI */}
                <div className="rounded-2xl border-2 border-[#10264c]/30 bg-white p-7 sm:p-8 shadow-lg shadow-[#10264c]/5">
                  <p className="text-sm uppercase tracking-widest text-[#10264c] font-medium mb-6">{cs.comparison.withAi.label}</p>
                  <div className="space-y-6">
                    {cs.comparison.withAi.stats.map((stat, i) => (
                      <div key={i}>
                        {i > 0 && <div className="h-px bg-[#d0c4b7]/50 mb-6" />}
                        <p className="text-4xl sm:text-5xl font-heading text-[#10264c]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{stat.value}</p>
                        <p className="text-[#5f6f88] mt-1">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ THE PROBLEM ═══ */}
        <section className="py-16 sm:py-24 px-6 bg-[#10264c] text-[#fefefe]">
          <div ref={problemSection.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${problemSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fefefe]/10 text-[#75e0f3] text-xs font-semibold tracking-wide uppercase mb-6">
                  {problem.label}
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl text-[#fefefe] mb-6 leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                  {problem.headline}
                </h2>
                <p className="text-[#fefefe]/75 text-lg leading-relaxed mb-8">
                  {problem.description}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {problem.stats.map((stat, i) => {
                    const isAnimated = stat.desc.includes("recoverable");
                    return (
                      <div key={i} className="rounded-2xl bg-[#fefefe]/5 border border-[#fefefe]/10 p-6">
                        <p className="text-4xl font-heading text-[#75e0f3]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                          {isAnimated ? `$${noShowCount.toLocaleString()}` : stat.value}
                        </p>
                        <p className="text-[#fefefe]/60 text-sm mt-1">{stat.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border border-[#fefefe]/10">
                  <img src={problem.image} alt={problem.imageAlt} className="w-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#fefefe] rounded-2xl p-4 sm:p-5 shadow-xl">
                  <p className="text-xs font-semibold text-[#5f6f88] uppercase tracking-wider mb-1">The Math</p>
                  <p className="text-[#10264c] text-sm leading-relaxed max-w-[240px]" dangerouslySetInnerHTML={{ __html: problem.mathCallout }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ AI APPOINTMENT / OPERATIONS SERVICE DETAIL ═══ */}
        <section id="appointment-service" className="py-16 sm:py-24 px-6 bg-[#fefefe]">
          <div ref={appointmentService.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${appointmentService.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#75e0f3] text-[#10264c] text-xs font-semibold tracking-wide uppercase">
                {(() => { const Icon = getIcon("CalendarCheck"); return <Icon className="w-3.5 h-3.5" />; })()} {appt.label}
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#10264c] mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {appt.headline}
            </h2>
            <p className="text-[#5f6f88] text-lg max-w-2xl mb-12">
              {appt.subheadline}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {appt.features.map((feature) => {
                const Icon = getIcon(feature.iconName);
                return (
                  <div key={feature.title} className="group rounded-2xl bg-[#f5efe6] p-7 border border-[#d0c4b7]/40 hover:shadow-lg hover:shadow-[#10264c]/5 hover:-translate-y-0.5 transition-all duration-300">
                    <Icon className="w-8 h-8 text-[#10264c] mb-4" strokeWidth={1.5} />
                    <h4 className="font-semibold text-[#10264c] text-lg mb-2">{feature.title}</h4>
                    <p className="text-[#5f6f88] leading-relaxed text-[15px]">{feature.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#10264c]/10 border border-[#d0c4b7]/30">
              <img src={appt.dashboardImage} alt={appt.dashboardImageAlt} className="w-full object-cover" loading="lazy" />
            </div>
            <p className="text-center text-[#5f6f88] mt-4 text-sm">{appt.dashboardCaption}</p>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#10264c]">
                <TrendingUp className="w-6 h-6 text-[#75e0f3]" />
                <p className="text-[#fefefe] text-lg" dangerouslySetInnerHTML={{ __html: appt.resultStat }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHAT IT LOOKS LIKE IN PRACTICE ═══ */}
        <section className="py-16 sm:py-24 px-6 bg-[#f3efe8]">
          <div ref={practiceStory.ref} className={`max-w-4xl mx-auto transition-all duration-700 ${practiceStory.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#75e0f3] mb-4 text-center">{story.label}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#10264c] mb-10 text-center leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {story.headline}
            </h2>

            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#d0c4b7]/40 shadow-lg shadow-[#10264c]/5">
              <div className="space-y-8">
                {story.steps.map((step, i) => {
                  const Icon = getIcon(step.iconName);
                  return (
                    <div key={i} className="flex gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 ${step.iconVariant === "teal" ? "bg-[#75e0f3]" : "bg-[#10264c]"}`}>
                        <Icon className={`w-5 h-5 ${step.iconVariant === "teal" ? "text-[#10264c]" : "text-[#75e0f3]"}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#10264c] mb-1">{step.title}</p>
                        <p className="text-[#5f6f88] leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
              {homeFaqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EVERYTHING INCLUDED CTA ═══ */}
        <section id="contact" className="py-16 sm:py-24 px-6 bg-[#fefefe]">
          <div ref={ctaSection.ref} className={`max-w-xl mx-auto transition-all duration-700 ${ctaSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="rounded-3xl bg-[#d0c4b7] p-8 sm:p-12 text-center">
              <h2 className="font-heading text-3xl sm:text-4xl text-[#10264c] mb-8" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                {cta.headline}
              </h2>
              <div className="space-y-4 text-left mb-8">
                {cta.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#10264c] flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#75e0f3]" />
                    </div>
                    <p className="text-[#10264c] font-medium">{item}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setQuizOpen(true)}
                className="block w-full py-4 rounded-xl bg-[#75e0f3] text-[#10264c] font-bold text-lg hover:brightness-95 active:scale-[0.98] transition-all duration-200"
              >
                {cta.ctaLabel}
              </button>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[#5f6f88]">
                {cta.subItems.map((item, i) => (
                  <span key={i}>{i > 0 && <span className="text-[#d0c4b7] mr-4">|</span>}{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ROI Quiz Modal */}
      <RoiQuiz open={quizOpen} onOpenChange={setQuizOpen} />

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
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition-colors">Back to top</a>
          </div>
          <p className="text-[#fefefe]/40 text-sm">© 2026 AutoM8</p>
        </div>
      </footer>
    </div>
  );
}
