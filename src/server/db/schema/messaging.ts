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

export const channelTypeEnum = pgEnum("channel_type", [
  "direct",
  "group",
  "project",
  "announcement",
  "public",
]);

export const messageTypeEnum = pgEnum("message_type", [
  "text",
  "image",
  "file",
  "voice",
  "system",
]);

export const channels = pgTable("channels", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),

  name: text("name"), // null for DMs
  description: text("description"),
  type: channelTypeEnum("type").notNull(),

  members: jsonb("members").$type<string[]>().notNull(), // user IDs
  projectId: text("project_id"), // soft ref → projects.id
  isArchived: boolean("is_archived").default(false).notNull(),
  lastMessageAt: timestamp("last_message_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  channelId: text("channel_id")
    .notNull()
    .references(() => channels.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),

  content: text("content"),
  type: messageTypeEnum("type").default("text").notNull(),
  attachments: jsonb("attachments").$type<string[]>(),
  mentions: jsonb("mentions").$type<string[]>(), // user IDs
  replyToId: text("reply_to_id"), // self-reference resolved at query level

  isEdited: boolean("is_edited").default(false).notNull(),
  editedAt: timestamp("edited_at"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  deletedAt: timestamp("deleted_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messageReactions = pgTable("message_reactions", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  messageId: text("message_id")
    .notNull()
    .references(() => messages.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  emoji: text("emoji").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messageReadReceipts = pgTable("message_read_receipts", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),

  messageId: text("message_id")
    .notNull()
    .references(() => messages.id, { onDelete: "cascade" }),
  channelId: text("channel_id")
    .notNull()
    .references(() => channels.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  readAt: timestamp("read_at").defaultNow().notNull(),
});
