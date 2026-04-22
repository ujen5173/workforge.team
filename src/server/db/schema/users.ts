import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { company } from "./company";

export const userTypeEnum = pgEnum("user_type", [
  "employee",
  "hr",
  "ceo-founder",
  "manager-team-lead",
]);

export const userStatusEnum = pgEnum("user_status", [
  "active",
  "inactive",
  "suspended",
  "on_leave",
]);

export const activityStatusEnum = pgEnum("activity_status", [
  "working",
  "available",
  "break",
  "meeting",
  "away",
  "offline",
]);

export const user = pgTable("user", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),

  // identity
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  companyEmail: text("company_email").notNull().unique(),
  personalEmail: text("personal_email"),
  passwordHash: text("password_hash").notNull(),
  profile: text("profile"), // avatar URL
  contactNumber: text("contact_number"),
  country: text("country"),
  timezone: text("timezone"),

  // role & org
  type: userTypeEnum("type").default("employee").notNull(),
  status: userStatusEnum("status").default("active").notNull(),
  position: text("position"),
  department: text("department"),
  isManager: boolean("is_manager").default(false).notNull(),
  managerId: text("manager_id"), // self-reference resolved at query level

  // schedule
  standardTime: text("standard_time"), // e.g. "09:00–18:00"
  workingHours: jsonb("working_hours").$type<{ start: string; end: string }>(),
  workingSchedule: jsonb("working_schedule").$type<string[]>(), // e.g. ["Mon","Tue","Wed"]

  socialLinks: jsonb("social_links").$type<Record<string, string>>(),

  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userActivity = pgTable("user_activity", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  status: activityStatusEnum("status").default("offline").notNull(),
  currentTaskId: text("current_task_id"), // soft ref to tasks
  lastActiveAt: timestamp("last_active_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
