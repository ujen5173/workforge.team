import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { company } from "./company";
import { user } from "./users";

export const analytics = pgTable("analytics", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),

  // the calendar day this record belongs to (date-only, stored as timestamp midnight UTC)
  date: timestamp("date").notNull(),

  // attendance
  punchedInTime: timestamp("punched_in_time"),
  punchedOutTime: timestamp("punched_out_time"),
  hoursWorked: real("hours_worked"),
  overtimeHours: real("overtime_hours"),

  // lateness / early leave
  isLate: boolean("is_late").default(false).notNull(),
  lateByMinutes: integer("late_by_minutes").default(0),
  earlyLeaveBy: integer("early_leave_by").default(0), // minutes

  // breaks
  numberOfBreaksTaken: integer("number_of_breaks_taken").default(0),
  totalBreakDuration: integer("total_break_duration").default(0), // minutes

  // productivity signals
  tasksCompletedToday: integer("tasks_completed_today").default(0),
  focusScore: integer("focus_score"), // 0–100
  keyboardAndMouseUsage: integer("keyboard_and_mouse_usage"), // minutes of tracked input
});
