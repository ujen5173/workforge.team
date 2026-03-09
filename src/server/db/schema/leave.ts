import {
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

export const leaveStatusEnum = pgEnum("leave_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

export const leaveTypeEnum = pgEnum("leave_type", [
  "half_day",
  "full_day",
  "multiple_days",
  "late_start",
  "early_leave",
]);

export const leaveCategoryEnum = pgEnum("leave_category", [
  "vacation",
  "sick_leave",
  "personal_leave",
  "maternity_leave",
  "paternity_leave",
  "compensatory",
]);

export const leaveRequests = pgTable("leave_requests", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),

  type: leaveTypeEnum("type").notNull(),
  category: leaveCategoryEnum("category").notNull(),
  status: leaveStatusEnum("status").default("pending").notNull(),

  reason: text("reason"),
  attachments: jsonb("attachments").$type<string[]>(), // e.g. doctor's note URL

  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),

  reviewedBy: text("reviewed_by").references(() => user.id),
  reviewedAt: timestamp("reviewed_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leaveBalances = pgTable("leave_balances", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  year: integer("year").notNull(),

  // vacation
  vacationTotal: integer("vacation_total").default(0).notNull(),
  vacationUsed: integer("vacation_used").default(0).notNull(),
  vacationPending: integer("vacation_pending").default(0).notNull(),

  // sick
  sickTotal: integer("sick_total").default(0).notNull(),
  sickUsed: integer("sick_used").default(0).notNull(),
  sickPending: integer("sick_pending").default(0).notNull(),

  // casual
  casualTotal: integer("casual_total").default(0).notNull(),
  casualUsed: integer("casual_used").default(0).notNull(),
  casualPending: integer("casual_pending").default(0).notNull(),

  // compensatory
  compensatoryEarned: integer("compensatory_earned").default(0).notNull(),
  compensatoryUsed: integer("compensatory_used").default(0).notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
