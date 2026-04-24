import {
  boolean,
  date,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const ROLES = pgEnum("role", [
  "OWNER",
  "HR",
  "EMPLOYEE",
  "MANAGER",
  "FINANCE-MANAGER",
]);
export const LOCATION_TYPE = pgEnum("location_type", [
  "ONSITE",
  "REMOTE",
  "HYBRID",
]);
export const PAY_STRUCTURE = pgEnum("pay_structure", [
  "MONTHLY",
  "WEEKLY",
  "BI-WEEKLY",
]);
export const SALARY_TYPE = pgEnum("salary_type", ["FIXED", "HOURLY"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  profile: text("profile"),

  socials: json("socials"), // Github, Linkedin, Dribble, Portfolio, Projects

  // Banking Details (encrypted)
  bankName: text("bank_name"),
  accountHolderName: text("account_holder_name"),
  accountNumber: text("account_number"),
  branch: text("branch"),
  swiftBICCode: text("swift_bic_code"),
  iban: text("iban"),
  paymentPlatform: text("payment_platform"), // wise, stripe, etc

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // This will determine the company a user is currently working.
  activeOrganizationId: text("active_organization_id"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Used by both core (email verification links) and emailOTP plugin
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  // maps to subdomain: {slug}.workforge.team
  slug: text("slug").unique(),
  logo: text("logo"),
  createdAt: timestamp("created_at").notNull(),

  spirit: text("spirit"),
  industry: text("industry"),
  teamSize: text("team_size"),
  website: text("website"),
  description: text("description"),
  workWeek: text("work_week").array().default([]),
  fiscalYear: text("fiscal_year"),

  // Company Information for About us page of the company
  strongTitle: text("strong_title"),
  strongDescription: text("strong_description"),
  foundedDate: date("founded_date"),
  hq: text("headquater").array().default([]),
  stage: text("stage"),
  timezone: text("timezone"),
  currency: text("currency"),

  payStructure: PAY_STRUCTURE(),
  salaryType: SALARY_TYPE(),

  foundersMessage: text("founder_message"),
});

export const member = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  // different roles have different type of dashboard and authority.
  role: ROLES(),
  // ceo, intern, SSE, swd, designer
  position: text("position"),

  salary: integer("salary"),

  workingSchedule: text("working_schedule").array(),

  motto: text("motto"),
  timezone: text("timezone"),
  currency: text("currency"), // currency user wants to get the salary visually.
  phoneNumber: text("phone_number"),
  title: text("title"),
  department: text("department"),
  employmentType: text("employment_type"),
  startDate: date("start_date"),
  location: LOCATION_TYPE(),
  dateFormat: text("date_format"),

  companyEmail: text("company_email").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
});

export const invitation = pgTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: ROLES(),
  status: text("status").notNull().default("pending"),
  expiresAt: timestamp("expires_at").notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
