import { pgEnum } from "drizzle-orm/pg-core";

export const ROLES = pgEnum("role", [
  "OWNER",
  "HR",
  "EMPLOYEE",
  "MANAGER",
  "FINANCE_MANAGER",
]);

export const LOCATION_TYPE = pgEnum("location_type", [
  "ONSITE",
  "REMOTE",
  "HYBRID",
]);

export const PAY_STRUCTURE = pgEnum("pay_structure", [
  "MONTHLY",
  "WEEKLY",
  "BI_WEEKLY",
]);

export const SALARY_TYPE = pgEnum("salary_type", ["FIXED", "HOURLY"]);

export const PRIORITY_LEVEL = pgEnum("priority_level", [
  "CRITICAL",
  "HIGH",
  "MEDIUM",
  "LOW",
]);

export const PROJECT_STATUS = pgEnum("project_status", [
  "ACTIVE",
  "PENDING",
  "COMPLETED",
  "ON_HOLD",
]);

export const TASK_STATUS = pgEnum("task_status", [
  "TODO",
  "IN_PROGRESS",
  "NEED_REVIEW",
  "BLOCKED",
  "ON_HOLD",
  "COMPLETED",
]);

export const CLIENT_TYPE = pgEnum("client_type", [
  "OUTSOURCING",
  "INTERNAL",
  "INTERNAL_TOOL",
]);

export const DIFFICULTY_LEVEL = pgEnum("difficulty_level", [
  "HIGH",
  "MEDIUM",
  "LOW",
]);

export const PROJECT_MEMBER_ROLE = pgEnum("project_member_role", [
  "MANAGER",
  "CONTRIBUTOR",
  "VIEWER",
]);

export const INVITATION_STATUS = pgEnum("invitation_status", [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "EXPIRED",
]);

export const LEAVE_TYPE = pgEnum("leave_type", [
  "ANNUAL",
  "SICK",
  "CASUAL",
  "MATERNITY",
  "PATERNITY",
  "UNPAID",
]);

export const LEAVE_STATUS = pgEnum("leave_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
]);
