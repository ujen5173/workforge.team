import type { Metadata } from "next";
import { env } from "~/env";

export const siteConfig = {
  name: "WorkForge",
  fullName: "WorkForge.team",
  tagline: "Where great teams get work done.",
  description:
    "WorkForge is an all-in-one employee management portal. Track tasks, monitor performance, manage leaves, and reward your best people.",
  url: `${env.NEXT_PUBLIC_APP_URL}`,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,

  keywords: [
    "employee management",
    "project management",
    "team collaboration",
    "performance tracking",
    "leave management",
    "payroll visibility",
    "task management",
    "workforce portal",
  ],

  socials: {
    twitter: "https://twitter.com/workforgeteam",
    github: "https://github.com/workforgeteam",
  },

  email: {
    support: "support@workforge.team",
    noreply: "noreply@workforge.team",
  },
} as const;

type MetadataOptions = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  canonicalUrl = siteConfig.url,
  ogImage = siteConfig.ogImage,
  keywords = [],
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const mergedKeywords = [...new Set([...siteConfig.keywords, ...keywords])];

  return {
    title: fullTitle,
    description,
    keywords: mergedKeywords,

    metadataBase: new URL(siteConfig.url),

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.fullName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@workforgeteam",
    },

    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },

    manifest: "/site.webmanifest",
  };
}
