import { date, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
import { LEAVE_STATUS, LEAVE_TYPE } from "./enum";
import { member, organization } from "./organization";

export const leaveRequests = pgTable(
  "leave_request",
  {
    id: text("id")
      .primaryKey()
      .default(sql`uuidv7()`),

    memberId: text("member_id")
      .notNull()
      .references(() => member.id, { onDelete: "cascade" }),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    type: LEAVE_TYPE().notNull(),
    status: LEAVE_STATUS().notNull().default("PENDING"),

    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    reason: text("reason"),

    reviewedById: text("reviewed_by_id").references(() => member.id, {
      onDelete: "set null",
    }),
    reviewedAt: timestamp("reviewed_at"),
    reviewNote: text("review_note"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("leave_member_id_idx").on(table.memberId),
    index("leave_org_id_idx").on(table.organizationId),
    index("leave_org_status_idx").on(table.organizationId, table.status),
    index("leave_dates_idx").on(table.startDate, table.endDate),
  ],
);
