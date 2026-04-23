/**
 * Industry Configuration Type System
 *
 * Every industry-specific string, quiz question, ROI formula,
 * and content block is driven by this config shape.
 * To launch a new industry, create a new config file that satisfies this interface.
 */

import type { ReactNode } from "react";

/* ─── Brand ─── */
export interface BrandConfig {
  /** Display name, e.g. "MedSpa" */
  name: string;
  /** Accent word, e.g. "AI" */
  accent: string;
  /** Tagline under the logo */
  tagline: string;
  /** Footer description */
  footerDesc: string;
}

/* ─── Hero ─── */
export interface HeroConfig {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaSub: string;
  backgroundImage: string;
}

/* ─── AI Employees ─── */
export interface AiEmployee {
  title: string;
  description: string;
  iconName: string;
}

/* ─── Services Overview ─── */
export interface ServiceOverviewCard {
  iconName: string;
  title: string;
  description: string;
  variant: "light" | "dark";
  anchor: string;
}

export interface ServicesOverviewConfig {
  label: string;
  headline: string;
  subheadline: string;
  cards: ServiceOverviewCard[];
}

/* ─── Content Service Detail ─── */
export interface HowItWorksStep {
  num: string;
  title: string;
  desc: string;
}

export interface ComparisonColumn {
  label: string;
  stats: { value: string; desc: string }[];
}

export interface ContentServiceConfig {
  label: string;
  headline: string;
  subheadline: string;
  howItWorks: HowItWorksStep[];
  socialImage: string;
  socialImageAlt: string;
  socialImageCaption: string;
  comparison: {
    headline: string;
    without: ComparisonColumn;
    withAi: ComparisonColumn;
  };
}

/* ─── Problem Section ─── */
export interface ProblemConfig {
  label: string;
  headline: string;
  description: string;
  stats: { value: string; desc: string }[];
  image: string;
  imageAlt: string;
  mathCallout: string;
}

/* ─── Appointment / Operations Service Detail ─── */
export interface ServiceFeature {
  iconName: string;
  title: string;
  desc: string;
}

export interface AppointmentServiceConfig {
  label: string;
  headline: string;
  subheadline: string;
  features: ServiceFeature[];
  dashboardImage: string;
  dashboardImageAlt: string;
  dashboardCaption: string;
  resultStat: string;
}

/* ─── Practice Story ─── */
export interface StoryStep {
  iconName: string;
  iconVariant: "dark" | "teal";
  title: string;
  desc: string;
}

export interface PracticeStoryConfig {
  label: string;
  headline: string;
  steps: StoryStep[];
}

/* ─── FAQ ─── */
export interface FaqItem {
  q: string;
  a: string;
}

/* ─── Everything Included CTA ─── */
export interface CtaConfig {
  headline: string;
  items: string[];
  ctaLabel: string;
  subItems: string[];
}

/* ─── Quiz ─── */
export interface QuizOption {
  label: string;
  value: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  iconName: string;
  options: QuizOption[];
}

export interface QuizConfig {
  questions: QuizQuestion[];
  emailPlaceholder: string;
  emailHeadline: string;
  emailSubtitle: string;
}

/* ─── ROI Calculation ─── */
export interface RoiConstants {
  staffHourly: number;
  workingDays: number;
  weeksPerMonth: number;
  recoveryRate: number;
  socialPortion: number;
  callPortion: number;
}

export interface RoiLabels {
  annualSuffix: string;
  noShowTitle: string;
  noShowDesc: (recoverablePerDay: number, dailyNoShows: number) => string;
  callTitle: string;
  callDesc: string;
  socialTitle: string;
  socialDesc: string;
}

export interface ResultsConfig {
  roiConstants: RoiConstants;
  roiLabels: RoiLabels;
  includedItems: string[];
  includedHeadline: string;
  includedSubheadline: string;
}

/* ─── Pricing ─── */
export interface PricingTier {
  iconName: string;
  label: string;
  title: string;
  price: string;
  priceSuffix?: string;
  description: string;
  ctaLabel: string;
  featured?: boolean;
  featuredBadge?: string;
}

export interface PricingConfig {
  heroLabel: string;
  heroHeadline: string;
  heroSubheadline: string;
  tiers: PricingTier[];
  faqs: FaqItem[];
  ctaHeadline: string;
  ctaSubheadline: string;
}

/* ─── Full Industry Config ─── */
export interface IndustryConfig {
  id: string;
  brand: BrandConfig;
  hero: HeroConfig;
  aiEmployees: AiEmployee[];
  servicesOverview: ServicesOverviewConfig;
  contentService: ContentServiceConfig;
  problem: ProblemConfig;
  appointmentService: AppointmentServiceConfig;
  practiceStory: PracticeStoryConfig;
  homeFaqs: FaqItem[];
  cta: CtaConfig;
  quiz: QuizConfig;
  results: ResultsConfig;
  pricing: PricingConfig;
}
