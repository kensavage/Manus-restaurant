/**
 * Restaurant Industry Configuration
 * All industry-specific content for the Restaurant AI landing page.
 *
 * Key differences from medical verticals:
 * - "No-shows" → reservation no-shows (parties that don't show up)
 * - "Patients" → covers/guests
 * - "Appointments" → reservations
 * - Revenue per appointment → average check per cover
 * - Additional focus on online reviews and reputation management
 */

import type { IndustryConfig } from "./types";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/hero-restaurant-73ZyAjPus7tHbMJh2QMnZt.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/restaurant-dashboard-78uKpbpAXuv5PpAEr9oRfb.webp";
const SOCIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/restaurant-social-content-cEKs7dkNCY67qaQ5GTqP3q.webp";
const RECEPTION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403135933/QK76jQwtXKqzF5FUD4qTbh/restaurant-reception-2YVREpCJg39jvqRopf2X8E.webp";

export const restaurantConfig: IndustryConfig = {
  id: "restaurant",

  brand: {
    name: "Restaurant",
    accent: "AI",
    tagline: "powered by AutoM8",
    footerDesc: "AI-powered operations for modern restaurants.",
  },

  hero: {
    headline: "The AI Operating System For Your Restaurant",
    subheadline: "Daily social content that fills your dining room and an AI reservation system that keeps every table booked. No new hires. No empty seats.",
    ctaLabel: "See How Much Money AI Can Save Your Restaurant",
    ctaSub: "Takes less than 60 seconds",
    backgroundImage: HERO_IMG,
  },

  aiEmployees: [
    { title: "Graphic Designer", description: "Creates stunning food photography and video content for your restaurant brand", iconName: "Palette" },
    { title: "Social Media Marketer", description: "Creates content and schedules posts across all platforms", iconName: "Share2" },
    { title: "Online Review Manager", description: "SMS messages diners after their meal and monitors online reviews", iconName: "Star" },
    { title: "Executive Assistant", description: "Monitors email, drafts replies, answers phone calls, and takes reservations", iconName: "Headphones" },
    { title: "Legal Consultant", description: "Translates legal documents and provides compliance advice", iconName: "Scale" },
  ],

  servicesOverview: {
    label: "Two AI Systems, One Platform",
    headline: "Everything your restaurant needs to grow",
    subheadline: "We handle the two biggest operational challenges restaurants face: staying visible online and keeping every table full.",
    cards: [
      {
        iconName: "Zap",
        title: "AI Content & Posting",
        description: "Daily social media content created, scheduled, and published for your restaurant. Instagram, Facebook, and Google Business Profile — handled.",
        variant: "light",
        anchor: "#content-service",
      },
      {
        iconName: "UtensilsCrossed",
        title: "AI Reservation Management",
        description: "Automated confirmations, smart waitlist fills, and no-show tracking that recovers up to $18,000/month in lost revenue.",
        variant: "dark",
        anchor: "#appointment-service",
      },
    ],
  },

  contentService: {
    label: "AI Content",
    headline: "Daily content that keeps your restaurant packed",
    subheadline: "We create, schedule, and publish daily social media content for your restaurant. You review and approve in about five minutes a week.",
    howItWorks: [
      { num: "1", title: "We learn your restaurant", desc: "We review your menu, vibe, and socials so the content sounds like your brand from day one." },
      { num: "2", title: "We build and schedule daily posts", desc: "Food photography, specials, behind-the-scenes kitchen content, and reservation drivers built around your restaurant." },
      { num: "3", title: "You approve in minutes", desc: "Spend about five minutes each week reviewing posts, and we handle the scheduling and publishing." },
    ],
    socialImage: SOCIAL_IMG,
    socialImageAlt: "Social media content created for restaurants — Instagram and Google Business Profile posts displayed on tablet and phone",
    socialImageCaption: "A sample of the content we create and schedule for your restaurant across Instagram, Facebook, and Google Business Profile.",
    comparison: {
      headline: "The difference",
      without: {
        label: "Without AutoM8",
        stats: [
          { value: "3", desc: "posts per month" },
          { value: "5hrs", desc: "spent on social per week" },
          { value: "?", desc: "results to show for it" },
        ],
      },
      withAi: {
        label: "With Restaurant AI",
        stats: [
          { value: "60", desc: "posts per month" },
          { value: "5min", desc: "from you per week" },
          { value: "15x", desc: "more visibility for your restaurant" },
        ],
      },
    },
  },

  problem: {
    label: "The Problem",
    headline: "No-shows are costing you $18,000 a month",
    description: "Reservation no-shows run 15–20% at most restaurants. Staff spends hours calling to confirm reservations, manage the waitlist, and fill empty tables. Every no-show costs your restaurant $50–$150 in lost revenue per cover.",
    stats: [
      { value: "15–20%", desc: "reservation no-show rate" },
      { value: "3–5hrs", desc: "daily on confirmations & waitlist" },
      { value: "$800", desc: "lost per night (10 empty covers)" },
      { value: "$18,000", desc: "recoverable per month" },
    ],
    image: RECEPTION_IMG,
    imageAlt: "Restaurant host stand managing reservations and waitlist during busy service",
    mathCallout: "60 covers/night × 15% no-show = 9 empty seats × $85 avg check = <strong>$765/night lost</strong>",
  },

  appointmentService: {
    label: "AI Operations",
    headline: "Automated reservation management that pays for itself",
    subheadline: "We build a complete automated system that handles confirmations, reminders, waitlist fills, and no-show tracking — so your host stand can focus on guests, not phones.",
    features: [
      { iconName: "Bell", title: "Smart Confirmations", desc: "Automatic confirmation at booking, day-before reminder, and 2-hour final reminder. Guests confirm by text." },
      { iconName: "Users", title: "Waitlist Auto-Fill", desc: "When a party cancels, the next group on the waitlist gets the table automatically. No staff intervention needed." },
      { iconName: "Shield", title: "No-Show Tracking", desc: "Repeat no-show guests are flagged. High-risk reservations get an extra touchpoint or require a credit card hold." },
      { iconName: "BarChart3", title: "Live Floor Dashboard", desc: "Your host sees real-time confirmation status for every reservation. No guessing, no manual tracking." },
      { iconName: "TrendingUp", title: "Revenue Recovery", desc: "Weekly reports showing no-show rate, waitlist fill rate, and total revenue recovered." },
      { iconName: "Star", title: "Review Collection", desc: "Automated post-meal SMS prompts guests to leave a review when they're happiest. Monitor and draft responses to all reviews." },
    ],
    dashboardImage: DASHBOARD_IMG,
    dashboardImageAlt: "AI reservation management dashboard showing floor plan, waitlist, and booking analytics for a restaurant",
    dashboardCaption: "Your host sees a live floor dashboard with confirmation status, waitlist queue, and automated notifications.",
    resultStat: "Most restaurants cut no-shows by <strong>40–60%</strong> within the first 90 days",
  },

  practiceStory: {
    label: "What It Looks Like In Practice",
    headline: "From 10 empty tables to a full house — without a single phone call",
    steps: [
      { iconName: "Calendar", iconVariant: "dark", title: "Thursday cancellations leave 10 open tables for Friday night", desc: "A restaurant has 10 open reservations due to Thursday cancellations. Normally, the host would spend Friday afternoon making calls." },
      { iconName: "MessageSquare", iconVariant: "teal", title: "AI sends waitlist offers Thursday evening", desc: "The AI system automatically texts guests on the waitlist, offering the open tables. Guests confirm within an hour and are added to the reservation book." },
      { iconName: "CalendarCheck", iconVariant: "dark", title: "Friday morning: 8 of 10 tables filled automatically", desc: "The host arrives to a nearly full Friday night without making a single call. The GM gets a weekly report showing no-show rate, waitlist fill rate, and revenue recovered." },
    ],
  },

  homeFaqs: [
    { q: "What do you actually handle for my restaurant?", a: "We create the content, schedule it, publish it, and keep the posting cadence moving. For reservation management, we set up and maintain the entire automated confirmation and waitlist system. You review and approve in a simple weekly flow, and we handle the rest." },
    { q: "What social platforms do you post to?", a: "We handle Instagram, Facebook, and Google Business Profile. We publish directly to your accounts so you do not have to log in every day just to stay consistent." },
    { q: "What kind of content do you create?", a: "Food photography, daily specials, behind-the-scenes kitchen content, chef spotlights, seasonal menu highlights, event promotions, and reservation drivers. The content is built around your restaurant, not generic templates." },
    { q: "Can I review everything before it goes live?", a: "Yes. Nothing gets posted without your approval. You can approve it, ask for a change, or skip a post entirely. You stay in control without having to manage the full process." },
    { q: "How does the AI reservation system work?", a: "Guests receive automatic confirmations after booking, reminders the day before and 2 hours before, and cancellations trigger instant waitlist fills. Your host sees a live dashboard with every reservation's confirmation status — no manual calls needed." },
    { q: "How does the review management work?", a: "After a guest dines, they receive an SMS prompting them to leave a review while the experience is fresh. We monitor all incoming reviews across Google, Yelp, and Facebook, and draft professional responses for your approval." },
    { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts and no cancellation fees. If it is not a fit, you can stop at any time." },
  ],

  cta: {
    headline: "Everything included",
    items: [
      "Daily posts created for your restaurant",
      "Scheduling and publishing handled for you",
      "Content built around your menu and specials",
      "AI reservation confirmations and reminders",
      "Automated waitlist fills for cancelled tables",
      "No-show tracking and revenue recovery reporting",
      "Post-meal review collection via SMS",
      "Consistent visibility without another hire",
    ],
    ctaLabel: "See How Much Money AI Can Save Your Restaurant",
    subItems: ["No contracts", "Cancel anytime"],
  },

  quiz: {
    questions: [
      {
        id: "patients",
        question: "How many covers do you serve per night?",
        subtitle: "Average across a typical week",
        iconName: "UtensilsCrossed",
        options: [
          { label: "Under 40 covers", value: 30 },
          { label: "40–80 covers", value: 60 },
          { label: "80–150 covers", value: 115 },
          { label: "150+ covers", value: 180 },
        ],
      },
      {
        id: "noShowRate",
        question: "What's your estimated reservation no-show rate?",
        subtitle: "Percentage of reservations that don't show up",
        iconName: "CalendarX",
        options: [
          { label: "Under 10%", value: 0.08 },
          { label: "10–15%", value: 0.12 },
          { label: "15–25%", value: 0.20 },
          { label: "Over 25%", value: 0.30 },
        ],
      },
      {
        id: "avgRevenue",
        question: "What's your average check per cover?",
        subtitle: "Including food, drinks, and gratuity",
        iconName: "DollarSign",
        options: [
          { label: "Under $40", value: 30 },
          { label: "$40–$75", value: 57 },
          { label: "$75–$120", value: 97 },
          { label: "Over $120", value: 150 },
        ],
      },
      {
        id: "socialHours",
        question: "How many hours per week does your team spend on social media, confirmations, and review management?",
        subtitle: "Creating content, posting, confirming reservations, and responding to reviews",
        iconName: "Clock",
        options: [
          { label: "Less than 3 hours", value: 2 },
          { label: "3–7 hours", value: 5 },
          { label: "7–15 hours", value: 11 },
          { label: "More than 15 hours", value: 18 },
        ],
      },
    ],
    emailPlaceholder: "you@yourrestaurant.com",
    emailHeadline: "Where should we send your savings report?",
    emailSubtitle: "Enter your email to see your personalized results",
  },

  results: {
    roiConstants: {
      staffHourly: 18,
      workingDays: 26,
      weeksPerMonth: 4.33,
      recoveryRate: 0.55,
      socialPortion: 0.4,
      callPortion: 0.6,
    },
    roiLabels: {
      annualSuffix: "estimated annual savings for your restaurant",
      noShowTitle: "No-Show Revenue Recovery",
      noShowDesc: (recoverablePerDay, dailyNoShows) =>
        `Recovering ${recoverablePerDay} of ${dailyNoShows} nightly no-show covers through automated confirmations, text reminders, and smart waitlist fills.`,
      callTitle: "Confirmation & Waitlist Savings",
      callDesc: "Host and manager time redirected from phone calls to guest experience. AI handles all reservation confirmations and waitlist management automatically.",
      socialTitle: "Social Media & Review Savings",
      socialDesc: "Daily content creation, scheduling, publishing, and review response drafting handled entirely by AI across Instagram, Facebook, and Google Business Profile.",
    },
    includedHeadline: "Everything included",
    includedSubheadline: "Two AI systems working together to grow your restaurant and recover lost revenue.",
    includedItems: [
      "Daily social media posts created for your restaurant",
      "Scheduling and publishing handled for you",
      "Content built around your menu and specials",
      "AI reservation confirmations and reminders",
      "Automated waitlist fills for cancelled tables",
      "No-show tracking and revenue recovery reporting",
      "Post-meal review collection and response drafting",
      "Simple weekly approval flow — 5 minutes",
    ],
  },

  pricing: {
    heroLabel: "Investment",
    heroHeadline: "Clear pricing, real ROI",
    heroSubheadline: "Every tier is designed to pay for itself. The reservation system alone can recover $18,000/month in lost revenue.",
    tiers: [
      {
        iconName: "BarChart3",
        label: "Entry Offer",
        title: "Operations Efficiency Audit",
        price: "$750",
        description: "We analyze your current no-show rate, confirmation workflow, review management, and scheduling gaps to show you exactly where revenue is being lost.",
        ctaLabel: "Book Your Audit",
      },
      {
        iconName: "Zap",
        label: "Implementation",
        title: "AI Reservation System",
        price: "$5,000–$10,000",
        description: "Full build-out of your automated reservation management system including confirmations, waitlist logic, no-show tracking, review collection, and live dashboard.",
        ctaLabel: "Get Started",
        featured: true,
        featuredBadge: "Most Popular",
      },
      {
        iconName: "TrendingUp",
        label: "Ongoing Retainer",
        title: "Restaurant Ops Retainer",
        price: "$2,000–$4,000",
        priceSuffix: "/mo",
        description: "Ongoing confirmation optimization, seasonal menu updates, waitlist logic tuning, review management, and monthly no-show and revenue recovery reporting plus daily social content.",
        ctaLabel: "Learn More",
      },
    ],
    faqs: [
      { q: "What's included in the Operations Efficiency Audit?", a: "We analyze your current no-show rate, confirmation workflow, review management process, and scheduling gaps. You'll receive a detailed report showing exactly where revenue is being lost and a roadmap for implementation." },
      { q: "How long does the AI Reservation System take to implement?", a: "Most implementations are completed within 2–4 weeks. This includes system setup, integration with your reservation platform, staff training, and a 2-week monitored launch period." },
      { q: "What does the Restaurant Ops Retainer include?", a: "Ongoing confirmation optimization, seasonal menu content updates, waitlist logic tuning, review monitoring and response drafting, monthly no-show and revenue recovery reporting, plus daily social media content creation and publishing." },
      { q: "Can I start with just the audit?", a: "Absolutely. The audit is designed as a standalone engagement. There's no obligation to move forward with implementation, though most restaurants do after seeing the data." },
      { q: "What's the typical ROI timeline?", a: "Most restaurants see measurable no-show reduction within the first 30 days. By 90 days, restaurants typically report a 40–60% reduction in no-shows, which more than covers the cost of the system." },
      { q: "Can I cancel the retainer anytime?", a: "Yes. There are no long-term contracts and no cancellation fees. If it's not a fit, you can stop at any time." },
    ],
    ctaHeadline: "Ready to stop losing revenue?",
    ctaSubheadline: "Book your Operations Efficiency Audit and see exactly how much your restaurant can recover.",
  },
};
