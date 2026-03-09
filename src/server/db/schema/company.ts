import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const verificationStatusEnum = pgEnum("verification_status", [
  "unverified",
  "pending",
  "verified",
]);

export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "free",
  "pro",
  "business",
  "enterprise",
]);

export const companySizeEnum = pgEnum("company_size", [
  "1_10",
  "11_50",
  "51_200",
  "201_500",
  "500_plus",
]);

export const company = pgTable("company", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  description: text("description"),
  industry: text("industry"),
  website: text("website"),
  hq: text("hq"),
  companySize: companySizeEnum("company_size"),
  foundedYear: integer("founded_year"),
  standardTime: text("standard_time"), // e.g. "09:00–18:00"
  timezone: text("time_zone"), // e.g. GMT+5:45 | GMT+0 | EST

  // structured JSON fields
  locations: jsonb("locations").$type<string[]>(),
  departments: jsonb("departments").$type<string[]>(),
  goals: jsonb("goals").$type<string[]>(),
  socialLinks: jsonb("social_links").$type<Record<string, string>>(),

  verificationStatus: verificationStatusEnum("verification_status").default(
    "unverified",
  ),
  subscriptionPlan: subscriptionPlanEnum("subscription_plan").default("free"),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
