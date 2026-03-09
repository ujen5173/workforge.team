import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { company } from "./company";
import { user } from "./users";

export const announcementTypeEnum = pgEnum("announcement_type", [
  "general",
  "urgent",
  "policy",
  "event",
]);

export const announcementAudienceEnum = pgEnum("announcement_audience", [
  "all",
  "department",
  "role",
]);

export const departments = pgTable("departments", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  headId: text("head_id").references(() => user.id, { onDelete: "set null" }),
  parentDepartmentId: text("parent_department_id"), // self-reference resolved at query level

  name: text("name").notNull(),
  description: text("description"),
  memberCount: integer("member_count").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const announcements = pgTable("announcements", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id),

  title: text("title").notNull(),
  content: text("content").notNull(),
  type: announcementTypeEnum("type").default("general").notNull(),
  targetAudience: announcementAudienceEnum("target_audience")
    .default("all")
    .notNull(),

  isPinned: boolean("is_pinned").default(false).notNull(),
  readBy: jsonb("read_by").$type<string[]>().default([]), // user IDs who read it

  publishedAt: timestamp("published_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
