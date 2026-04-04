import {
  ClipboardList, User, Mail, CalendarDays, Smartphone, Megaphone,
  Palette, PenTool, BookOpen, Image, Target, Ruler,
  RefreshCw, DollarSign, Settings,
  Brain, Building2, Zap, Sun, Video
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Deliverable {
  icon: LucideIcon;
  label: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  niche: string;
  stat: string;
  headline: string;
  subheadline: string;
  context: string;
  image: string | null;
  heroImages: string[];
  deliverables: Deliverable[];
  sections: {
    title: string;
    body: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "madcow",
    name: "MADCOW",
    niche: "PET ACCESSORIES",
    stat: "40% REVENUE FROM EMAIL",
    headline: "MADCOW COLLARS.",
    subheadline: "Turning a dog collar brand into a direct-response machine.",
    context: "Madcow came to us with a great product and zero email infrastructure. We built the entire backend — flows, campaigns, personas, and a 30-day calendar — from scratch.",
    image: "/images/brand-madcow.png",
    heroImages: ["/images/email-01.png", "/images/email-02.png", "/images/email-03.png", "/images/email-04.png", "/images/email-05.png", "/images/email-06.png"],
    deliverables: [
      { icon: ClipboardList, label: "USP EXTRACTION" },
      { icon: User, label: "PERSONA BUILD" },
      { icon: Mail, label: "EMAIL FLOWS" },
      { icon: CalendarDays, label: "CAMPAIGN CALENDAR" },
      { icon: Smartphone, label: "SMS SEQUENCES" },
      { icon: Megaphone, label: "CAMPAIGN ANGLES" },
    ],
    sections: [
      {
        title: "THE PROBLEM",
        body: "Madcow had a cult following but relied entirely on paid ads. No email flows, no retention system, no lifecycle strategy. Every customer was acquired once and never spoken to again.",
      },
      {
        title: "THE APPROACH",
        body: "We extracted 100+ USPs, built 3 detailed buyer personas, and constructed a full email backend — welcome flow, post-purchase, browse abandonment, winback, and a 30-day campaign calendar tailored to each persona.",
      },
      {
        title: "THE RESULT",
        body: "Within 90 days, email accounted for 40% of total revenue. Open rates averaged 47%. The brand went from zero email infrastructure to a fully autonomous retention engine.",
      },
    ],
  },
  {
    slug: "xyko",
    name: "XYKO",
    niche: "FASHION & LIFESTYLE",
    stat: "FULL BRAND OVERHAUL",
    headline: "XYKO.",
    subheadline: "A complete brand identity and email creative system — from zero.",
    context: "XYKO needed more than email. They needed a visual language, a brand bible, and a creative direction that could scale across every touchpoint.",
    image: "/images/brand-xyko.png",
    heroImages: ["/images/email-04.png", "/images/email-05.png", "/images/email-06.png", "/images/email-01.png", "/images/email-02.png", "/images/email-03.png"],
    deliverables: [
      { icon: Palette, label: "BRAND OVERHAUL" },
      { icon: PenTool, label: "EMAIL CREATIVES" },
      { icon: BookOpen, label: "BRAND BIBLE" },
      { icon: Image, label: "VISUAL SYSTEM" },
      { icon: Target, label: "FEATURE EMAILS" },
      { icon: Ruler, label: "CREATIVE DIRECTION" },
    ],
    sections: [
      {
        title: "THE PROBLEM",
        body: "XYKO's brand identity was fragmented — inconsistent visuals, no design system, and email creatives that didn't match the caliber of their product.",
      },
      {
        title: "THE APPROACH",
        body: "We rebuilt their entire visual identity from scratch. A brand bible covering typography, color, tone, and imagery. A modular email creative system. And a creative direction document that any designer could follow.",
      },
      {
        title: "THE RESULT",
        body: "XYKO launched with a cohesive brand presence across email, social, and web — all built from the same creative system. Every touchpoint now feels unmistakably XYKO.",
      },
    ],
  },
  {
    slug: "flatpack",
    name: "FLATPACK",
    niche: "HOME & LIFESTYLE",
    stat: "$100K IN ONE MONTH",
    headline: "FLATPACK.",
    subheadline: "$100K in one month — powered by email alone.",
    context: "Flatpack had traffic but no conversion infrastructure. We built a full email backend and launched a 30-day campaign calendar that generated $100K in its first month.",
    image: "/images/brand-flatpack.png",
    heroImages: ["/images/email-01.png", "/images/email-03.png", "/images/email-05.png", "/images/email-02.png", "/images/email-04.png", "/images/email-06.png"],
    deliverables: [
      { icon: ClipboardList, label: "USP EXTRACTION" },
      { icon: Mail, label: "EMAIL FLOWS" },
      { icon: CalendarDays, label: "30-DAY CALENDAR" },
      { icon: RefreshCw, label: "WELCOME FLOW" },
      { icon: DollarSign, label: "$100K RESULT" },
      { icon: Settings, label: "FULL BACKEND" },
    ],
    sections: [
      {
        title: "THE PROBLEM",
        body: "Flatpack was spending heavily on acquisition but had no backend to capture, nurture, or convert that traffic. Customers visited once and disappeared.",
      },
      {
        title: "THE APPROACH",
        body: "We extracted their core USPs, built a welcome flow optimized for immediate conversion, and launched a 30-day campaign calendar targeting three distinct buyer personas.",
      },
      {
        title: "THE RESULT",
        body: "$100K in revenue in the first month from email alone. The welcome flow alone accounted for 35% of that. Backend ROI was immediate and compounding.",
      },
    ],
  },
  {
    slug: "4am-skin",
    name: "4AM SKIN",
    niche: "SKINCARE & BEAUTY",
    stat: "FULL BRAND SYSTEM",
    headline: "4AM SKIN.",
    subheadline: "A brand intelligence system built for scale.",
    context: "4AM SKIN needed a complete brand foundation — from persona research to a 30-day content calendar — before writing a single email.",
    image: "/images/brand-4amskin.png",
    heroImages: ["/images/email-02.png", "/images/email-04.png", "/images/email-06.png", "/images/email-01.png", "/images/email-03.png", "/images/email-05.png"],
    deliverables: [
      { icon: ClipboardList, label: "100+ USPS" },
      { icon: BookOpen, label: "BRAND BIBLE" },
      { icon: User, label: "3 PERSONAS" },
      { icon: CalendarDays, label: "30-DAY CALENDAR" },
      { icon: Mail, label: "EMAIL FRAMEWORK" },
      { icon: Brain, label: "BRAND INTELLIGENCE" },
    ],
    sections: [
      {
        title: "THE PROBLEM",
        body: "4AM SKIN had a premium product but no structured brand language. Their messaging was inconsistent and their email strategy was nonexistent.",
      },
      {
        title: "THE APPROACH",
        body: "We built a complete brand intelligence system: 100+ USPs, 3 detailed personas, a brand bible, and a 30-day campaign calendar — all before writing a single email.",
      },
      {
        title: "THE RESULT",
        body: "4AM SKIN launched with a brand system that scales. Every piece of content — email, social, web — now pulls from the same intelligence layer.",
      },
    ],
  },
  {
    slug: "mktg",
    name: "MKTG",
    niche: "8-FIGURE KLAVIYO AGENCY",
    stat: "$1M GENERATED · 12+ BRANDS",
    headline: "MKTG.",
    subheadline: "$1M generated across 12+ brands in a single quarter.",
    context: "MKTG is an 8-figure Klaviyo agency. They brought us in to write high-converting email copy across their entire portfolio — fast.",
    image: null,
    heroImages: ["/images/innerdose-01.png", "/images/innerdose-02.png", "/images/innerdose-03.png", "/images/innerdose-04.png", "/images/innerdose-05.png", "/images/heroloupes-01.png", "/images/heroloupes-02.png", "/images/primetrain-01.png", "/images/primetrain-02.png", "/images/primetrain-03.png", "/images/bestbody-03.png", "/images/bestbody-04.png", "/images/bestbody-05.png", "/images/bestbody-06.png", "/images/loveluggage-01.png"],
    deliverables: [
      { icon: DollarSign, label: "$1M GENERATED" },
      { icon: Building2, label: "8-FIG AGENCY" },
      { icon: PenTool, label: "12+ BRANDS" },
      { icon: Mail, label: "EMAIL COPY" },
      { icon: Target, label: "MULTI-BRAND" },
      { icon: Zap, label: "ONE QUARTER" },
    ],
    sections: [
      {
        title: "THE PROBLEM",
        body: "MKTG needed a copywriter who could match their speed, quality, and volume — across a dozen brands in different niches, simultaneously.",
      },
      {
        title: "THE APPROACH",
        body: "We embedded directly into their workflow, producing campaign copy, flow copy, and strategic angles for 12+ brands — all within a single quarter.",
      },
      {
        title: "THE RESULT",
        body: "$1M+ in attributable revenue across the portfolio. Consistent voice, consistent quality, consistent results — at agency scale.",
      },
    ],
  },
  {
    slug: "adsumo",
    name: "ADSUMO DIGITAL",
    niche: "AGENCY — MULTIPLE BRANDS",
    stat: "HIGH 6-FIGURE CAMPAIGNS",
    headline: "ADSUMO DIGITAL.",
    subheadline: "High 6-figure campaigns — built on copy that converts.",
    context: "Adsumo Digital is a performance agency. We partnered with them to produce campaign and flow copy across multiple DTC brands.",
    image: null,
    heroImages: ["/images/greengoo-01.png", "/images/greengoo-02.png", "/images/greengoo-03.png", "/images/greengoo-05.png", "/images/whiskeyballs-01.png", "/images/whiskeyballs-02.png", "/images/whiskeyballs-03.png", "/images/whiskeyballs-04.png", "/images/upairy-01.png", "/images/upairy-02.png"],
    deliverables: [
      { icon: Sun, label: "SUMMER CAMPAIGNS" },
      { icon: RefreshCw, label: "FLOW COPY" },
      { icon: Building2, label: "AGENCY PARTNER" },
      { icon: Video, label: "CASE STUDY VIDEO" },
      { icon: DollarSign, label: "HIGH 6-FIGURES" },
      { icon: PenTool, label: "MULTI-BRAND COPY" },
    ],
    sections: [
      {
        title: "THE PROBLEM",
        body: "Adsumo needed a reliable copy partner who could handle multiple brands, tight deadlines, and high-stakes campaigns without dropping quality.",
      },
      {
        title: "THE APPROACH",
        body: "We produced seasonal campaign copy, automated flow sequences, and strategic angles for their entire portfolio — including a featured case study video.",
      },
      {
        title: "THE RESULT",
        body: "High 6-figure campaign results across multiple brands. Adsumo now uses our copy framework as their internal standard for client onboarding.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAdjacentStudies(slug: string): { prev: CaseStudy; next: CaseStudy } {
  const idx = caseStudies.findIndex((cs) => cs.slug === slug);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  return { prev, next };
}
