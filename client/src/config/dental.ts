/**
 * Dental Industry Configuration
 * All industry-specific content for the Dental AI landing page.
 */

import type { IndustryConfig } from "./types";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/hero-dental-jqj5hu7k2Ls87KK8MXuw72.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/dental-dashboard-UEATVd23eVzMV6H8rPWkDq.webp";
const SOCIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/dental-social-content-dXCeXY7EVsqaXyncBYquxd.webp";
const RECEPTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/dental-reception-S8FZGprFcKetPD8rVhm3fX.webp";

export const dentalConfig: IndustryConfig = {
  id: "dental",

  brand: {
    name: "Dental",
    accent: "AI",
    tagline: "powered by AutoM8",
    footerDesc: "AI-powered operations for modern dental practices.",
  },

  hero: {
    headline: "The AI Operating System For Your Dental Practice",
    subheadline: "Daily social content that grows your patient base and an AI appointment system that keeps your chairs full. No new hires. No missed revenue.",
    ctaLabel: "See How Much Money AI Can Save Your Practice",
    ctaSub: "Takes less than 60 seconds",
    backgroundImage: HERO_IMG,
  },

  aiEmployees: [
    { title: "Graphic Designer", description: "Creates stunning images and videos for your dental practice brand", iconName: "Palette" },
    { title: "Social Media Marketer", description: "Creates content and schedules posts across all platforms", iconName: "Share2" },
    { title: "Online Review Manager", description: "SMS messages patients after visits and monitors online reviews", iconName: "Star" },
    { title: "Executive Assistant", description: "Monitors email, drafts replies, answers phone calls, and takes appointments", iconName: "Headphones" },
    { title: "Legal Consultant", description: "Translates legal documents and provides compliance advice", iconName: "Scale" },
  ],

  servicesOverview: {
    label: "Two AI Systems, One Platform",
    headline: "Everything your dental practice needs to grow",
    subheadline: "We handle the two biggest operational challenges dental practices face: staying visible online and keeping your schedule full.",
    cards: [
      {
        iconName: "Zap",
        title: "AI Content & Posting",
        description: "Daily social media content created, scheduled, and published for your dental practice. Instagram, Facebook, and Google Business Profile — handled.",
        variant: "light",
        anchor: "#content-service",
      },
      {
        iconName: "CalendarCheck",
        title: "AI Appointment Management",
        description: "Automated reminders, smart waitlist fills, and no-show tracking that recovers up to $20,000/month in lost revenue.",
        variant: "dark",
        anchor: "#appointment-service",
      },
    ],
  },

  contentService: {
    label: "AI Content",
    headline: "Daily content that keeps your practice visible",
    subheadline: "We create, schedule, and publish daily social media content for your dental practice. You review and approve in about five minutes a week.",
    howItWorks: [
      { num: "1", title: "We learn your practice", desc: "We review your site, services, and socials so the content sounds like your brand from day one." },
      { num: "2", title: "We build and schedule daily posts", desc: "Dental tips, smile transformations, team spotlights, and appointment drivers built around your practice." },
      { num: "3", title: "You approve in minutes", desc: "Spend about five minutes each week reviewing posts, and we handle the scheduling and publishing." },
    ],
    socialImage: SOCIAL_IMG,
    socialImageAlt: "Social media content created for dental practices — Instagram and Facebook posts displayed on tablet and phone",
    socialImageCaption: "A sample of the content we create and schedule for your dental practice across Instagram, Facebook, and Google Business Profile.",
    comparison: {
      headline: "The difference",
      without: {
        label: "Without AutoM8",
        stats: [
          { value: "3", desc: "posts per month" },
          { value: "4hrs", desc: "spent on social per week" },
          { value: "?", desc: "results to show for it" },
        ],
      },
      withAi: {
        label: "With Dental AI",
        stats: [
          { value: "60", desc: "posts per month" },
          { value: "5min", desc: "from you per week" },
          { value: "15x", desc: "more visibility for your practice" },
        ],
      },
    },
  },

  problem: {
    label: "The Problem",
    headline: "No-shows are costing you $20,000 a month",
    description: "No-shows run 15–30% at most dental practices. Staff spends 2–4 hours daily calling patients to confirm appointments, reschedule cancellations, and fill gaps in the schedule. Every no-show costs your practice $150–$250 in lost revenue.",
    stats: [
      { value: "15–30%", desc: "average no-show rate" },
      { value: "2–4hrs", desc: "daily on confirmation calls" },
      { value: "$900", desc: "lost per day (6 no-shows)" },
      { value: "$20,000", desc: "recoverable per month" },
    ],
    image: RECEPTION_IMG,
    imageAlt: "Dental office front desk staff spending hours on confirmation calls",
    mathCallout: "30 patients/day × 20% no-show = 6 lost appointments × $150 = <strong>$900/day lost</strong>",
  },

  appointmentService: {
    label: "AI Operations",
    headline: "Automated appointment management that pays for itself",
    subheadline: "We build a complete automated system that handles confirmations, reminders, waitlist fills, and no-show tracking — so your front desk can focus on patients, not phones.",
    features: [
      { iconName: "Bell", title: "Smart Reminders", desc: "Automatic confirmation at booking, 72-hour reminder, and 2-hour final reminder. Patients confirm by text." },
      { iconName: "Users", title: "Waitlist Auto-Fill", desc: "When a patient cancels, the next person on the waitlist gets the slot automatically. No staff intervention needed." },
      { iconName: "Shield", title: "No-Show Tracking", desc: "High-risk patients are flagged and get an extra touchpoint. Patterns are tracked per patient over time." },
      { iconName: "BarChart3", title: "Live Dashboard", desc: "Your front desk sees real-time confirmation status for every appointment. No guessing, no manual tracking." },
      { iconName: "TrendingUp", title: "Revenue Recovery", desc: "Weekly reports showing no-show rate, waitlist fill rate, and total revenue recovered." },
      { iconName: "UserCheck", title: "Provider Onboarding", desc: "New dentists and hygienists are added to the system seamlessly with customized reminder sequences." },
    ],
    dashboardImage: DASHBOARD_IMG,
    dashboardImageAlt: "AI appointment management dashboard showing calendar, waitlist, and no-show analytics for a dental practice",
    dashboardCaption: "Your front desk sees a live schedule dashboard with confirmation status, waitlist queue, and automated notifications.",
    resultStat: "Most practices cut no-shows by <strong>40–60%</strong> within the first 90 days",
  },

  practiceStory: {
    label: "What It Looks Like In Practice",
    headline: "From 8 empty chairs to a full schedule — without a single phone call",
    steps: [
      { iconName: "Calendar", iconVariant: "dark", title: "Weekend cancellations leave 8 open slots on Tuesday", desc: "A dental practice has 8 open slots due to weekend cancellations. Normally, the front desk would spend Monday morning making calls." },
      { iconName: "MessageSquare", iconVariant: "teal", title: "AI sends waitlist offers Sunday evening", desc: "The AI system automatically texts patients on the waitlist, offering the open slots. Patients confirm within an hour and are added to the schedule." },
      { iconName: "CalendarCheck", iconVariant: "dark", title: "Monday morning: 6 of 8 slots filled automatically", desc: "The front desk arrives to a nearly full Tuesday schedule without making a single call. The practice administrator gets a weekly report showing no-show rate, waitlist fill rate, and revenue recovered." },
    ],
  },

  homeFaqs: [
    { q: "What do you actually handle for my dental practice?", a: "We create the content, schedule it, publish it, and keep the posting cadence moving. For appointment management, we set up and maintain the entire automated reminder and waitlist system. You review and approve in a simple weekly flow, and we handle the rest." },
    { q: "What social platforms do you post to?", a: "We handle Instagram, Facebook, and Google Business Profile. We publish directly to your accounts so you do not have to log in every day just to stay consistent." },
    { q: "What kind of content do you create?", a: "Dental tips, smile transformation showcases, team spotlights, seasonal promotions, educational posts about oral health, and appointment drivers. The content is built around your practice, not generic templates." },
    { q: "Can I review everything before it goes live?", a: "Yes. Nothing gets posted without your approval. You can approve it, ask for a change, or skip a post entirely. You stay in control without having to manage the full process." },
    { q: "How does the AI appointment system work?", a: "Patients receive automatic confirmations after booking, reminders at 72 hours and 2 hours before, and cancellations trigger instant waitlist fills. Your front desk sees a live dashboard with every appointment's confirmation status — no manual calls needed." },
    { q: "How is this different from hiring a social media manager?", a: "No hiring, no onboarding, no chasing someone to stay consistent. You get daily marketing output, automated appointment management, and approval control without adding another employee or agency retainer to manage." },
    { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts and no cancellation fees. If it is not a fit, you can stop at any time." },
  ],

  cta: {
    headline: "Everything included",
    items: [
      "Daily posts created for your dental practice",
      "Scheduling and publishing handled for you",
      "Content built around your services and specialties",
      "AI appointment reminders and confirmations",
      "Automated waitlist fills for cancelled slots",
      "No-show tracking and revenue recovery reporting",
      "Simple weekly approval flow",
      "Consistent visibility without another hire",
    ],
    ctaLabel: "See How Much Money AI Can Save Your Practice",
    subItems: ["No contracts", "Cancel anytime"],
  },

  quiz: {
    questions: [
      {
        id: "patients",
        question: "How many patients do you see per day?",
        subtitle: "Average across all providers and hygienists",
        iconName: "Users",
        options: [
          { label: "10–20 patients", value: 15 },
          { label: "20–35 patients", value: 27 },
          { label: "35–50 patients", value: 42 },
          { label: "50+ patients", value: 60 },
        ],
      },
      {
        id: "noShowRate",
        question: "What's your estimated no-show rate?",
        subtitle: "Percentage of patients who miss appointments",
        iconName: "CalendarX",
        options: [
          { label: "Under 10%", value: 0.08 },
          { label: "10–20%", value: 0.15 },
          { label: "20–30%", value: 0.25 },
          { label: "Over 30%", value: 0.35 },
        ],
      },
      {
        id: "avgRevenue",
        question: "What's your average revenue per appointment?",
        subtitle: "Including cleanings, fillings, and procedures",
        iconName: "DollarSign",
        options: [
          { label: "Under $150", value: 125 },
          { label: "$150–$250", value: 200 },
          { label: "$250–$400", value: 325 },
          { label: "Over $400", value: 500 },
        ],
      },
      {
        id: "socialHours",
        question: "How many hours per week does your team spend on social media and confirmation calls?",
        subtitle: "Creating content, posting, confirming appointments, and rescheduling",
        iconName: "Clock",
        options: [
          { label: "Less than 3 hours", value: 2 },
          { label: "3–7 hours", value: 5 },
          { label: "7–15 hours", value: 11 },
          { label: "More than 15 hours", value: 18 },
        ],
      },
    ],
    emailPlaceholder: "you@yourpractice.com",
    emailHeadline: "Where should we send your savings report?",
    emailSubtitle: "Enter your email to see your personalized results",
  },

  results: {
    roiConstants: {
      staffHourly: 22,
      workingDays: 22,
      weeksPerMonth: 4.33,
      recoveryRate: 0.55,
      socialPortion: 0.35,
      callPortion: 0.65,
    },
    roiLabels: {
      annualSuffix: "estimated annual savings for your dental practice",
      noShowTitle: "No-Show Revenue Recovery",
      noShowDesc: (recoverablePerDay, dailyNoShows) =>
        `Recovering ${recoverablePerDay} of ${dailyNoShows} daily no-shows through automated reminders, text confirmations, and smart waitlist fills.`,
      callTitle: "Confirmation Call Savings",
      callDesc: "Front desk time redirected from phone calls to patient care. AI handles all appointment confirmations and rescheduling automatically.",
      socialTitle: "Social Media Savings",
      socialDesc: "Daily content creation, scheduling, and publishing handled entirely by AI across Instagram, Facebook, and Google Business Profile.",
    },
    includedHeadline: "Everything included",
    includedSubheadline: "Two AI systems working together to grow your practice and recover lost revenue.",
    includedItems: [
      "Daily social media posts created for your dental practice",
      "Scheduling and publishing handled for you",
      "Content built around your services and specialties",
      "AI appointment reminders and confirmations",
      "Automated waitlist fills for cancelled slots",
      "No-show tracking and revenue recovery reporting",
      "Live schedule dashboard for your front desk",
      "Simple weekly approval flow — 5 minutes",
    ],
  },

  pricing: {
    heroLabel: "Investment",
    heroHeadline: "Clear pricing, real ROI",
    heroSubheadline: "Every tier is designed to pay for itself. The appointment system alone can recover $20,000/month in lost revenue.",
    tiers: [
      {
        iconName: "BarChart3",
        label: "Entry Offer",
        title: "Schedule Efficiency Audit",
        price: "$750",
        description: "We analyze your current no-show rate, confirmation workflow, and scheduling gaps to show you exactly where revenue is being lost.",
        ctaLabel: "Book Your Audit",
      },
      {
        iconName: "Zap",
        label: "Implementation",
        title: "AI Appointment System",
        price: "$5,000–$10,000",
        description: "Full build-out of your automated appointment management system including reminders, waitlist logic, no-show tracking, and live dashboard.",
        ctaLabel: "Get Started",
        featured: true,
        featuredBadge: "Most Popular",
      },
      {
        iconName: "TrendingUp",
        label: "Ongoing Retainer",
        title: "Practice Ops Retainer",
        price: "$2,000–$4,000",
        priceSuffix: "/mo",
        description: "Ongoing reminder optimization, new provider onboarding, waitlist logic updates, and monthly no-show and revenue recovery reporting plus daily social content.",
        ctaLabel: "Learn More",
      },
    ],
    faqs: [
      { q: "What's included in the Schedule Efficiency Audit?", a: "We analyze your current no-show rate, confirmation workflow, scheduling gaps, and staff time allocation. You'll receive a detailed report showing exactly where revenue is being lost and a roadmap for implementation." },
      { q: "How long does the AI Appointment System take to implement?", a: "Most implementations are completed within 2–4 weeks. This includes system setup, integration with your practice management software, staff training, and a 2-week monitored launch period." },
      { q: "What does the Practice Ops Retainer include?", a: "Ongoing reminder sequence optimization, new provider onboarding, waitlist logic updates, monthly no-show and revenue recovery reporting, plus daily social media content creation and publishing." },
      { q: "Can I start with just the audit?", a: "Absolutely. The audit is designed as a standalone engagement. There's no obligation to move forward with implementation, though most practices do after seeing the data." },
      { q: "What's the typical ROI timeline?", a: "Most practices see measurable no-show reduction within the first 30 days. By 90 days, practices typically report a 40–60% reduction in no-shows, which more than covers the cost of the system." },
      { q: "Can I cancel the retainer anytime?", a: "Yes. There are no long-term contracts and no cancellation fees. If it's not a fit, you can stop at any time." },
    ],
    ctaHeadline: "Ready to stop losing revenue?",
    ctaSubheadline: "Book your Schedule Efficiency Audit and see exactly how much your practice can recover.",
  },
};
