import type { Metadata } from "next";

type OgType =
  | "website"
  | "article"
  | "profile"
  | "book"
  | "music.song"
  | "video.movie";

type TwitterCard = "summary" | "summary_large_image" | "app" | "player";

type RobotsConfig = {
  index?: boolean;
  follow?: boolean;
  nocache?: boolean;
  googleBot?: {
    index?: boolean;
    follow?: boolean;
    noimageindex?: boolean;
    maxVideoPreview?: number;
    maxImagePreview?: "none" | "standard" | "large";
    maxSnippet?: number;
  };
};

type SeoOptions = {
  title?: string;
  titleAbsolute?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  ogType?: OgType;
  twitterCard?: TwitterCard;
  keywords?: string[];
  robots?: RobotsConfig;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  noSuffix?: boolean;
};

const SITE = {
  name: "WorkForge",
  tagline: "The All-in-One Company Operating System",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://workforge.team",
  description:
    "WorkForge is an all-in-one company operating system — hire, onboard, communicate, manage tasks, run payroll, and grow your team from one unified platform. Replace Rippling, Slack, Notion, and BambooHR with a single product built for companies with 5 to 500 people.",
  foundingYear: "2024",
  logo: "/logo.png",
  og: {
    image: "/og-default.png",
    width: 1200,
    height: 630,
  },
  twitter: {
    handle: "@workforgeteam",
    site: "@workforgeteam",
  },
  locale: "en_US",
  socials: {
    twitter: "https://twitter.com/workforgeteam",
    linkedin: "https://linkedin.com/company/workforge",
    github: "https://github.com/ujen5173",
  },
  contact: {
    support: "https://workforge.team/contact",
    email: "hello@workforge.team",
  },
  pricing: "https://workforge.team/pricing",
} as const;

const KEYWORDS = {
  brand: [
    "WorkForge",
    "workforge.team",
    "WorkForge platform",
    "WorkForge app",
    "company operating system",
    "all-in-one HR platform",
    "unified workplace platform",
  ],

  competitor: [
    "Rippling alternative",
    "Deel alternative",
    "BambooHR alternative",
    "Slack alternative",
    "Notion alternative",
    "HiBob alternative",
    "Lattice alternative",
    "Monday.com alternative",
    "ClickUp alternative",
    "Greenhouse alternative",
    "Lever alternative",
    "Workday alternative",
    "ADP alternative",
    "Gusto alternative",
    "better than Rippling",
    "cheaper than Rippling",
    "Rippling vs WorkForge",
    "Deel vs WorkForge",
  ],

  platform: [
    "workforce management platform",
    "HR management platform",
    "all-in-one HR software",
    "HRIS software",
    "HCM platform",
    "human capital management",
    "human resources information system",
    "people operations platform",
    "people ops software",
    "employee management software",
    "workplace management software",
    "remote work platform",
    "distributed team platform",
    "remote-first company tools",
    "HR software for startups",
    "HR software for small business",
    "HR platform 10 to 500 employees",
    "HR software growing companies",
    "scalable HR platform",
  ],

  hiring: [
    "applicant tracking system",
    "ATS software",
    "recruitment management software",
    "talent acquisition platform",
    "hiring pipeline software",
    "job board software",
    "internal job board",
    "candidate tracking software",
    "collaborative hiring software",
    "interview scheduling software",
    "recruitment workflow software",
    "end-to-end recruiting platform",
    "hire to onboard software",
  ],

  onboarding: [
    "employee onboarding software",
    "digital employee onboarding",
    "automated onboarding platform",
    "new hire onboarding portal",
    "remote employee onboarding",
    "self-service onboarding",
    "onboarding checklist software",
    "role-based onboarding flows",
    "employee offboarding software",
    "e-signature onboarding",
    "contractor onboarding software",
    "bulk employee import",
    "org chart software",
    "organizational chart generator",
    "employee directory software",
  ],

  communication: [
    "team communication software",
    "business messaging app",
    "team chat software",
    "internal communication tool",
    "async communication platform",
    "threaded messaging software",
    "business instant messaging",
    "team channels software",
    "company announcements software",
    "video conferencing software",
    "async video messages",
    "voice messaging for teams",
    "message translation tool",
    "team presence status software",
    "screen sharing software",
    "meeting recording software",
    "auto-generated meeting transcripts",
  ],

  tasks: [
    "task management software",
    "project management platform",
    "kanban board software",
    "gantt chart software",
    "project timeline software",
    "task tracking software",
    "team task management",
    "workload management software",
    "capacity planning software",
    "sprint planning software",
    "milestone tracking software",
    "time tracking software",
    "project dashboard software",
    "task dependency management",
    "recurring task templates",
    "multi-view project management",
    "team workload visibility",
    "burnout risk detection software",
    "smart task assignment engine",
    "workload intelligence platform",
  ],

  performance: [
    "performance management software",
    "employee performance tracking",
    "OKR software",
    "KPI tracking software",
    "SMART goals software",
    "performance review software",
    "360 degree feedback software",
    "employee review cycle software",
    "one-on-one meeting software",
    "performance improvement plan software",
    "PIP management software",
    "employee recognition software",
    "employee shoutout software",
    "achievement badge software",
    "performance scorecard software",
  ],

  payroll: [
    "payroll software",
    "automated payroll processing",
    "payslip generation software",
    "contractor payment software",
    "freelancer payment platform",
    "expense management software",
    "expense claim software",
    "reimbursement management software",
    "benefits administration software",
    "benefits enrollment software",
    "compensation management software",
    "headcount planning software",
    "budget forecasting HR software",
    "payroll for startups",
    "employment contract management",
    "offer letter software",
  ],

  culture: [
    "company culture software",
    "employee engagement platform",
    "pulse survey software",
    "employee mood tracking",
    "team engagement software",
    "virtual watercooler software",
    "employee spotlight software",
    "employee recognition platform",
    "anonymous feedback software",
    "learning and development software",
    "L&D platform",
    "employee resource group software",
    "ERG management software",
  ],

  hr: [
    "leave management software",
    "time off management software",
    "PTO tracking software",
    "parental leave management",
    "sick leave tracking software",
    "team calendar software",
    "shared company calendar",
    "public holiday calendar software",
    "Google Calendar sync HR",
    "Outlook calendar sync HR",
    "HR compliance software",
    "labor law compliance platform",
    "GDPR compliant HR software",
    "SOC 2 HR platform",
    "SSO HR software",
    "two-factor authentication HR",
    "HR audit logs",
    "role-based access control RBAC",
    "data residency HR software",
  ],

  knowledge: [
    "internal wiki software",
    "company knowledge base",
    "team documentation software",
    "SOP management software",
    "policy documentation software",
    "rich document editor",
    "document version history",
    "file storage platform",
    "global search platform",
    "enterprise search software",
    "document template software",
    "meeting notes software",
  ],

  ai: [
    "AI meeting summary software",
    "AI task creation from meetings",
    "AI smart scheduling",
    "AI writing assistant for HR",
    "AI performance review software",
    "AI anomaly detection HR",
    "AI HR platform",
    "AI workplace software",
    "natural language search HR",
    "AI-powered workforce management",
  ],
} as const;

function flatKeywords(extra: string[] = []): string[] {
  return [
    ...KEYWORDS.brand,
    ...KEYWORDS.competitor,
    ...KEYWORDS.platform,
    ...KEYWORDS.hiring,
    ...KEYWORDS.onboarding,
    ...KEYWORDS.communication,
    ...KEYWORDS.tasks,
    ...KEYWORDS.performance,
    ...KEYWORDS.payroll,
    ...KEYWORDS.culture,
    ...KEYWORDS.hr,
    ...KEYWORDS.knowledge,
    ...KEYWORDS.ai,
    ...extra,
  ];
}

function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, "");
  const segment = path.startsWith("/") ? path : `/${path}`;
  return `${base}${segment}`;
}

function buildTitle(options: SeoOptions): string {
  if (options.titleAbsolute) return options.titleAbsolute;
  if (!options.title || options.noSuffix) return options.title ?? SITE.name;
  return `${options.title} — ${SITE.name}`;
}

function buildRobots(robots?: RobotsConfig): Metadata["robots"] {
  if (!robots) {
    return {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    };
  }

  return {
    index: robots.index ?? true,
    follow: robots.follow ?? true,
    ...(robots.nocache ? { nocache: true } : {}),
    googleBot: {
      index: robots.googleBot?.index ?? robots.index ?? true,
      follow: robots.googleBot?.follow ?? robots.follow ?? true,
      ...(robots.googleBot?.noimageindex ? { noimageindex: true } : {}),
      "max-image-preview": robots.googleBot?.maxImagePreview ?? "large",
      "max-snippet": robots.googleBot?.maxSnippet ?? -1,
      "max-video-preview": robots.googleBot?.maxVideoPreview ?? -1,
    },
  };
}

export function constructSeo(options: SeoOptions = {}): Metadata {
  const {
    description = SITE.description,
    path = "/",
    image = SITE.og.image,
    imageAlt = `${SITE.name} — ${SITE.tagline}`,
    ogType = "website",
    twitterCard = "summary_large_image",
    keywords = [],
    robots,
    publishedAt,
    modifiedAt,
    author,
  } = options;

  const title = buildTitle(options);
  const canonicalUrl = absoluteUrl(path);
  const ogImageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords: flatKeywords(keywords),
    authors: author
      ? [{ name: author }]
      : [{ name: SITE.name, url: SITE.url }],

    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },

    robots: buildRobots(robots),

    openGraph: {
      type: ogType,
      title,
      description,
      url: canonicalUrl,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [
        {
          url: ogImageUrl,
          width: SITE.og.width,
          height: SITE.og.height,
          alt: imageAlt,
          type: "image/png",
        },
      ],
      ...(ogType === "article" && publishedAt
        ? {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            authors: author ? [author] : undefined,
            section: "Workforce Management",
            tags: [...KEYWORDS.brand, ...KEYWORDS.platform],
          }
        : {}),
    },

    twitter: {
      card: twitterCard,
      title,
      description,
      creator: SITE.twitter.handle,
      site: SITE.twitter.site,
      images: [{ url: ogImageUrl, alt: imageAlt }],
    },

    applicationName: SITE.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    category: "business",
    classification:
      "HR Software, Payroll, Team Communication, Project Management, Workforce Management",

    verification: {
      // google: "",
      // yandex: "",
      // bing: "",
    },

    other: {
      "theme-color": "#0f172a",
      "color-scheme": "light dark",
      "format-detection": "telephone=no",
    },
  };
}

export const rootMetadata: Metadata = {
  ...constructSeo(),

  metadataBase: new URL(SITE.url),

  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE.url}/#logo`,
      url: absoluteUrl(SITE.logo),
      width: 512,
      height: 512,
      caption: SITE.name,
    },
    description: SITE.description,
    foundingDate: SITE.foundingYear,
    sameAs: Object.values(SITE.socials),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English"],
        url: SITE.contact.support,
        email: SITE.contact.email,
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["English"],
        url: absoluteUrl("/contact/sales"),
      },
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#software`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory:
      "HR Software, Payroll Software, Project Management, Team Communication",
    operatingSystem: "Web, iOS, Android",
    softwareVersion: "1.0",
    inLanguage: "en-US",
    offers: {
      "@type": "Offer",
      url: SITE.pricing,
      priceCurrency: "USD",
      price: "0",
      description:
        "Free trial available. Paid plans for teams of all sizes.",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    featureList: [
      "Employee Onboarding & Offboarding",
      "Role-Based Access Control",
      "Interactive Org Chart",
      "Employee Directory",
      "Multi-Workspace Support",
      "Team Messaging & Channels",
      "Threaded Replies & @Mentions",
      "Async Voice & Video Messages",
      "1:1 and Group Video Conferencing",
      "Meeting Recording & Auto-Transcripts",
      "Company-Wide Announcements",
      "Kanban, List, Timeline & Calendar Views",
      "Task Dependencies & Subtasks",
      "Time Tracking",
      "Workload Intelligence & Capacity Planning",
      "Burnout Risk Scoring",
      "Smart Task Assignment Engine",
      "KPI & OKR Tracking",
      "Performance Review Cycles",
      "One-on-One Meeting Logs",
      "Employee Recognition & Badges",
      "Performance Improvement Plans",
      "Company Culture Board",
      "Pulse Surveys & Anonymous Feedback",
      "Mood Check-Ins",
      "Leave Management & PTO Tracking",
      "Shared Team & Company Calendars",
      "Google Calendar & Outlook Sync",
      "Payroll Processing",
      "Payslip Generation",
      "Expense Claims & Reimbursement",
      "Benefits Administration",
      "Contractor & Freelancer Payments",
      "Headcount Planning",
      "Internal Wiki & Knowledge Base",
      "Rich Document Editor",
      "File Storage with Version History",
      "Applicant Tracking System (ATS)",
      "Interview Scheduling",
      "Collaborative Hiring",
      "SSO via Google, Microsoft & Okta",
      "Two-Factor Authentication",
      "Full Audit Logs",
      "GDPR & SOC 2 Compliance",
      "AI Meeting Summaries",
      "AI Task Suggestions",
      "AI Smart Scheduling",
      "AI Writing Assistant",
      "AI Performance Review Drafts",
      "Natural Language Search",
    ],
    screenshot: absoluteUrl("/screenshot.png"),
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#software` },
    inLanguage: "en-US",
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  image,
  publishedAt,
  modifiedAt,
  author,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
}) {
  const url = absoluteUrl(path);
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl(SITE.og.image);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: SITE.og.width,
      height: SITE.og.height,
    },
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    inLanguage: "en-US",
    about: {
      "@type": "Thing",
      name: "Workforce Management",
    },
    articleSection: "Workforce Management",
    keywords: [...KEYWORDS.brand, ...KEYWORDS.platform].join(", "),
  };
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function buildHowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: absoluteUrl(step.image) } : {}),
    })),
  };
}

export function buildReviewJsonLd({
  author,
  rating,
  body,
  datePublished,
}: {
  author: string;
  rating: number;
  body: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: body,
    datePublished,
    itemReviewed: {
      "@id": `${SITE.url}/#software`,
    },
  };
}

export function buildJobPostingJsonLd({
  title,
  description,
  datePosted,
  validThrough,
  employmentType,
  remote,
  baseSalary,
}: {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACTOR"
    | "TEMPORARY"
    | "INTERN";
  remote?: boolean;
  baseSalary?: { min: number; max: number; currency: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    ...(validThrough ? { validThrough } : {}),
    employmentType,
    hiringOrganization: {
      "@id": `${SITE.url}/#organization`,
    },
    ...(remote
      ? {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Worldwide",
            },
          },
          jobLocationType: "TELECOMMUTE",
        }
      : {}),
    ...(baseSalary
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: baseSalary.currency,
            value: {
              "@type": "QuantitativeValue",
              minValue: baseSalary.min,
              maxValue: baseSalary.max,
              unitText: "YEAR",
            },
          },
        }
      : {}),
  };
}

export function buildAggregateRatingJsonLd({
  ratingValue,
  reviewCount,
  bestRating = 5,
}: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#software`,
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating,
      worstRating: 1,
    },
  };
}