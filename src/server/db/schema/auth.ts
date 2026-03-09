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

export const invitationStatusEnum = pgEnum("invitation_status", [
  "pending",
  "accepted",
  "expired",
  "revoked",
]);

export const deviceTypeEnum = pgEnum("device_type", [
  "desktop",
  "mobile",
  "tablet",
]);

export const twoFactorMethodEnum = pgEnum("two_factor_method", [
  "totp",
  "sms",
  "email",
]);

export const sessions = pgTable("sessions", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  device: text("device"),
  location: text("location"),
  isActive: boolean("is_active").default(true).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userDevices = pgTable("user_devices", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  deviceName: text("device_name"),
  deviceType: deviceTypeEnum("device_type"),
  os: text("os"),
  browser: text("browser"),
  ipAddress: text("ip_address"),
  isTrusted: boolean("is_trusted").default(false).notNull(),
  lastSeenAt: timestamp("last_seen_at"),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
});

export const twoFactorAuth = pgTable("two_factor_auth", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  method: twoFactorMethodEnum("method").notNull(),
  secret: text("secret").notNull(),
  isEnabled: boolean("is_enabled").default(false).notNull(),
  backupCodes: jsonb("backup_codes").$type<string[]>(),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invitations = pgTable("invitations", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  invitedBy: text("invited_by")
    .notNull()
    .references(() => user.id),
  email: text("email").notNull(),
  role: text("role"), // e.g. "engineer", "designer"
  department: text("department"),
  token: text("token").notNull().unique(),
  status: invitationStatusEnum("status").default("pending").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  acceptedAt: timestamp("accepted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
