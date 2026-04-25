import {
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  INVITATION_STATUS,
  LOCATION_TYPE,
  PAY_STRUCTURE,
  ROLES,
  SALARY_TYPE,
} from "./enum";
import { user } from "./users";

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(), // subdomain: {organization}.workforge.team
  logo: text("logo"),

  spirit: text("spirit"),
  industry: text("industry"),
  teamSize: text("team_size"),
  website: text("website"),
  description: text("description"),

  workWeek: text("work_week").array().default([]), // ["MON","TUE","WED","THU","FRI"]
  fiscalYear: text("fiscal_year"),
  timezone: text("timezone"),
  currency: text("currency").default("USD"),
  payStructure: PAY_STRUCTURE(),
  salaryType: SALARY_TYPE(),

  // About the company (about us page)
  strongTitle: text("strong_title"),
  strongDescription: text("strong_description"),
  foundedDate: date("founded_date"),
  headquarters: text("headquarters").array().default([]),
  stage: text("stage"), // "seed" | "series-a" | "bootstrapped" | etc.
  foundersMessage: text("founder_message"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const member = pgTable(
  "member",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    role: ROLES().notNull().default("EMPLOYEE"),
    position: text("position"),

    salary: integer("salary"),
    currency: text("currency"),
    payStructure: PAY_STRUCTURE(),
    salaryType: SALARY_TYPE(),

    // Work
    location: LOCATION_TYPE(),
    timezone: text("timezone"),
    workingSchedule: text("working_schedule").array(),

    // Profile
    motto: text("motto"),
    phoneNumber: text("phone_number"),
    title: text("title"), // display title, e.g. "Tech Lead"
    department: text("department"),
    employmentType: text("employment_type"), // "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN"
    startDate: date("start_date"),
    dateFormat: text("date_format"),

    companyEmail: text("company_email").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("member_org_user_unique_idx").on(
      table.organizationId,
      table.userId,
    ),
    index("member_org_id_idx").on(table.organizationId),
    index("member_user_id_idx").on(table.userId),
    index("member_role_idx").on(table.role),
  ],
);

export const invitation = pgTable(
  "invitation",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: ROLES().notNull().default("EMPLOYEE"),
    status: INVITATION_STATUS().notNull().default("PENDING"),
    expiresAt: timestamp("expires_at").notNull(),
    inviterId: text("inviter_id").references(() => member.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("invitation_org_id_idx").on(table.organizationId),
    index("invitation_org_email_idx").on(table.organizationId, table.email),
  ],
);
