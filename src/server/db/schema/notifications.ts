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
import { user } from "./users";

export const notificationTypeEnum = pgEnum("notification_type", [
  "task",
  "mention",
  "review",
  "leave",
  "payroll",
  "system",
  "announcement",
]);

export const notifications = pgTable("notifications", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),

  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  body: text("body"),
  referenceId: text("reference_id"), // ID of the linked entity
  referenceType: text("reference_type"), // e.g. "task", "leave_request"

  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }),

  action: text("action").notNull(), // e.g. "task.status_changed"
  targetType: text("target_type"), // e.g. "task"
  targetId: text("target_id"), // entity ID
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),

  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
