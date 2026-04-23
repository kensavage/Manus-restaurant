/**
 * Results Page — Config-Driven
 *
 * Displays personalized ROI savings estimate after the quiz.
 * Reads answers from URL query params. All labels and formulas from config.
 *
 * Design: Deep navy (#10264c) + warm cream (#f5efe6) + electric teal (#75e0f3)
 */

import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useSearch } from "wouter";
import { config } from "@/config";
import {
  Sparkles,
  TrendingUp,
  Clock,
  BarChart3,
  ArrowRight,
  Check,
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

/* ─── Calculation ─── */
function calculateROI(patients: number, noShowRate: number, avgRevenue: number, staffHours: number) {
  const c = config.results.roiConstants;

  const dailyNoShows = patients * noShowRate;
  const recoverablePerDay = dailyNoShows * c.recoveryRate;
  const monthlyNoShowRecovery = Math.round(recoverablePerDay * avgRevenue * c.workingDays);

  const socialPortion = staffHours * c.socialPortion;
  const callPortion = staffHours * c.callPortion;
  const monthlySocialSavings = Math.round(socialPortion * c.weeksPerMonth * c.staffHourly);
  const monthlyCallSavings = Math.round(callPortion * c.weeksPerMonth * c.staffHourly);

  const totalMonthlySavings = monthlyNoShowRecovery + monthlySocialSavings + monthlyCallSavings;
  const annualSavings = totalMonthlySavings * 12;

  return {
    monthlyNoShowRecovery,
    monthlySocialSavings,
    monthlyCallSavings,
    totalMonthlySavings,
    annualSavings,
    dailyNoShows: Math.round(dailyNoShows * 10) / 10,
    recoverablePerDay: Math.round(recoverablePerDay * 10) / 10,
  };
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, duration = 1400 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  return <>{formatCurrency(display)}</>;
}

export default function Results() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const breakdownSection = useReveal();
  const ctaSection = useReveal();

  const { brand, results: resultsConfig, quiz: quizConfig } = config;
  const labels = resultsConfig.roiLabels;

  // Parse query params — use quiz question IDs dynamically
  const params = useMemo(() => new URLSearchParams(search), [search]);

  // We need specific params for the ROI calc. The first 4 quiz questions map to:
  // patients, noShowRate, avgRevenue, socialHours (by their IDs)
  const patients = Number(params.get("patients") || params.get("p")) || 0;
  const noShowRate = Number(params.get("noShowRate") || params.get("n")) || 0;
  const avgRevenue = Number(params.get("avgRevenue") || params.get("r")) || 0;
  const socialHours = Number(params.get("socialHours") || params.get("s")) || 0;
  const email = params.get("e") || "";

  const results = useMemo(
    () => calculateROI(patients, noShowRate, avgRevenue, socialHours),
    [patients, noShowRate, avgRevenue, socialHours]
  );

  useEffect(() => {
    if (!patients && !noShowRate && !avgRevenue && !socialHours) {
      navigate("/");
    }
  }, [patients, noShowRate, avgRevenue, socialHours, navigate]);

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
            <button onClick={() => navigate("/")} className="hover:text-[#10264c] transition-colors">Home</button>
            <button onClick={() => navigate("/pricing")} className="hover:text-[#10264c] transition-colors">Pricing</button>
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
            <button onClick={() => { navigate("/"); setMobileMenuOpen(false); }} className="block text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">Home</button>
            <button onClick={() => { navigate("/pricing"); setMobileMenuOpen(false); }} className="block text-sm font-medium text-[#10264c]/70 hover:text-[#10264c] py-2">Pricing</button>
            <button data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-3 rounded-xl bg-[#10264c] text-white text-sm font-semibold hover:bg-[#1a3366] transition-colors">Get Started</button>
          </div>
        )}
      </header>

      <main>
        {/* ═══ HERO — Annual Savings ═══ */}
        <section className="py-16 sm:py-24 px-6 bg-[#10264c] text-center relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-10" style={{ background: "#75e0f3" }} />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-8" style={{ background: "#d0c4b7" }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#75e0f3]/20 text-[#75e0f3] text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Your Savings Estimate
            </div>
            <p className="text-6xl sm:text-8xl font-bold text-[#fefefe] tracking-tight mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              <AnimatedNumber value={results.annualSavings} />
            </p>
            <p className="text-[#fefefe]/60 text-lg">{labels.annualSuffix}</p>
            {email && (
              <p className="text-[#fefefe]/40 text-sm mt-4">
                A copy of this report has been sent to {email}
              </p>
            )}
          </div>
        </section>

        {/* ═══ MONTHLY BREAKDOWN ═══ */}
        <section className="py-16 sm:py-24 px-6 bg-[#fefefe]">
          <div ref={breakdownSection.ref} className={`max-w-3xl mx-auto transition-all duration-700 ${breakdownSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#75e0f3] mb-4 text-center">Monthly Breakdown</p>
            <h2 className="text-3xl sm:text-5xl text-[#10264c] mb-12 text-center" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              Where the savings come from
            </h2>

            <div className="space-y-4">
              {/* No-show recovery */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#f5efe6]/70 border border-[#d0c4b7]/40">
                <div className="w-12 h-12 rounded-xl bg-[#10264c] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#75e0f3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-[#10264c]">{labels.noShowTitle}</h3>
                    <p className="text-lg font-bold text-[#10264c] tabular-nums">{formatCurrency(results.monthlyNoShowRecovery)}<span className="text-sm font-normal text-[#5f6f88]">/mo</span></p>
                  </div>
                  <p className="text-sm text-[#5f6f88]">
                    {labels.noShowDesc(results.recoverablePerDay, results.dailyNoShows)}
                  </p>
                </div>
              </div>

              {/* Confirmation call savings */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#f5efe6]/70 border border-[#d0c4b7]/40">
                <div className="w-12 h-12 rounded-xl bg-[#10264c] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#75e0f3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-[#10264c]">{labels.callTitle}</h3>
                    <p className="text-lg font-bold text-[#10264c] tabular-nums">{formatCurrency(results.monthlyCallSavings)}<span className="text-sm font-normal text-[#5f6f88]">/mo</span></p>
                  </div>
                  <p className="text-sm text-[#5f6f88]">{labels.callDesc}</p>
                </div>
              </div>

              {/* Social media savings */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#f5efe6]/70 border border-[#d0c4b7]/40">
                <div className="w-12 h-12 rounded-xl bg-[#10264c] flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-[#75e0f3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-[#10264c]">{labels.socialTitle}</h3>
                    <p className="text-lg font-bold text-[#10264c] tabular-nums">{formatCurrency(results.monthlySocialSavings)}<span className="text-sm font-normal text-[#5f6f88]">/mo</span></p>
                  </div>
                  <p className="text-sm text-[#5f6f88]">{labels.socialDesc}</p>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between p-6 rounded-2xl bg-[#10264c] text-[#fefefe]">
                <div>
                  <p className="text-lg font-semibold">Total Monthly Savings</p>
                  <p className="text-sm text-[#fefefe]/50 mt-0.5">That's {formatCurrency(results.annualSavings)} per year</p>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-[#75e0f3] tabular-nums">{formatCurrency(results.totalMonthlySavings)}<span className="text-lg font-normal text-[#fefefe]/50">/mo</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHAT'S INCLUDED + CTA ═══ */}
        <section className="py-16 sm:py-24 px-6 bg-[#f3efe8]">
          <div ref={ctaSection.ref} className={`max-w-3xl mx-auto transition-all duration-700 ${ctaSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#75e0f3] mb-4">What You Get</p>
              <h2 className="text-3xl sm:text-5xl text-[#10264c] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                {resultsConfig.includedHeadline}
              </h2>
              <p className="text-[#5f6f88] text-lg max-w-xl mx-auto">
                {resultsConfig.includedSubheadline}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {resultsConfig.includedItems.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#d0c4b7]/40">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#10264c] flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#75e0f3]" />
                  </div>
                  <p className="text-[#10264c] font-medium text-[15px]">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/pricing")}
                className="inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-[#75e0f3] text-[#10264c] font-bold text-lg hover:brightness-95 active:scale-[0.98] transition-all duration-200"
              >
                See Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                data-cal-link="launchclub/autom8-audit" data-cal-namespace="autom8-audit" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="inline-flex items-center gap-2 py-4 px-8 rounded-xl border-2 border-[#10264c] text-[#10264c] font-bold text-lg hover:bg-[#10264c] hover:text-white transition-all duration-200"
              >
                Book Your Audit
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[#5f6f88]">
              <span>No contracts</span>
              <span className="text-[#d0c4b7]">|</span>
              <span>Cancel anytime</span>
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
