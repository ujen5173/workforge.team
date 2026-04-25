import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";

import { siteConfig } from "~/lib/site";

import Logo from "./Logo";

const footerColumns = [
  {
    title: "Solutions",
    links: [
      "Task & Projects",
      "Performance Tracking",
      "Leave Management",
      "Payroll Visibility",
      "Rewards & Recognition",
      "Team Directory",
      "Real-time Notifications",
      "In-app Messaging",
      "All Solutions",
    ],
  },
  {
    title: "Platform",
    links: [
      `${siteConfig.name} Core`,
      "Multi-tenant Workspaces",
      "Automation Rules",
      "Reporting",
      "Integrations",
      "Workflow Builder",
      "Platform Status",
    ],
  },
  {
    title: `Why ${siteConfig.name}?`,
    links: [
      "Built for small teams",
      "Customer stories",
      "Security",
      "Compliance",
      "Role-based Access",
      "Partner Program",
      "Affiliates",
    ],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Guides",
      "Webinars",
      "HR Glossary",
      "Template Library",
      "API Documentation",
      "Help Center",
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#111214] px-4 py-12 text-neutral-300 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-white/10 pb-8">
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-neutral-200">
            <Link href="#">About us</Link>
            <Link href="#">Leadership team</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Product impact</Link>
            <Link href="#">Pricing</Link>
          </nav>
        </div>

        <div className="grid gap-8 border-b border-white/10 py-8 md:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white">
                {group.title}
              </h4>
              <ul className="mt-3 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 border-b border-white/10 py-8 lg:grid-cols-[1fr_1.3fr_1.4fr] lg:items-center">
          <div>
            <Logo />
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Twitter className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Linkedin className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Facebook className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Instagram className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          <p className="max-w-md text-2xl leading-tight font-semibold text-white">
            Get updates on modern team operations delivered to your inbox.
          </p>

          <div>
            <div className="flex items-center rounded-full bg-white px-2 py-2">
              <input
                type="email"
                placeholder="What's your e-mail?"
                className="w-full bg-transparent px-3 text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
              />
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              I confirm that I have read {siteConfig.name}&apos;s privacy policy
              and agree with it.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© Copyright 2026. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="#">Disclaimer</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Cookie Settings</Link>
            <Link href="#">Legal Hub</Link>
            <Link href="#">Whistleblower Policy</Link>
            <Link href="#">Disclosures</Link>
            <Link href="#">Licenses & Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
