import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
  "pending",
  "in_progress",
  "review_needed",
  "completed",
  "cancelled",
  "blocked",
  "on_hold",
  "archived",
]);

export const taskUrgencyEnum = pgEnum("task_urgency", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const taskDifficultyEnum = pgEnum("task_difficulty", [
  "easy",
  "medium",
  "hard",
  "expert",
]);

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "approved",
  "rejected",
  "revision_requested",
  "in_review",
]);

export const subTaskStatusEnum = pgEnum("sub_task_status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);

export const obstacleStatusEnum = pgEnum("obstacle_status", [
  "open",
  "in_progress",
  "resolved",
  "wont_fix",
]);

export const obstacleCategoryEnum = pgEnum("obstacle_category", [
  "awaiting_design",
  "awaiting_review",
  "blocked_by_task",
  "external_dependency",
  "technical_issue",
  "resource_unavailable",
  "requirement_unclear",
  "other",
]);

export const taskActivityTypeEnum = pgEnum("task_activity_type", [
  "created",
  "status_changed",
  "assigned",
  "unassigned",
  "commented",
  "attachment_added",
  "attachment_removed",
  "due_date_changed",
  "priority_changed",
  "reviewed",
  "points_updated",
  "sub_task_added",
  "sub_task_completed",
  "obstacle_reported",
  "obstacle_resolved",
  "time_logged",
  "tag_added",
  "tag_removed",
  "title_changed",
  "description_changed",
  "archived",
  "restored",
  "dependency_added",
  "dependency_removed",
]);

export const dependencyTypeEnum = pgEnum("dependency_type", [
  "blocks",
  "blocked_by",
  "relates_to",
  "duplicates",
  "cloned_from",
]);

export const attachmentTypeEnum = pgEnum("attachment_type", [
  "image",
  "document",
  "video",
  "audio",
  "archive",
  "link",
  "other",
]);

export const commentReactionEnum = pgEnum("comment_reaction", [
  "thumbs_up",
  "thumbs_down",
  "heart",
  "laugh",
  "confused",
  "rocket",
  "eyes",
]);

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").notNull(),
    companyId: uuid("company_id").notNull(),
    projectId: uuid("project_id"),
    parentTaskId: uuid("parent_task_id"),

    title: text("title").notNull(),
    description: text("description"),
    shortId: text("short_id").notNull(),

    status: taskStatusEnum("status").notNull().default("pending"),
    urgency: taskUrgencyEnum("urgency").notNull().default("medium"),
    difficulty: taskDifficultyEnum("difficulty").notNull().default("medium"),

    assignedTo: uuid("assigned_to"),
    assignedBy: uuid("assigned_by"),
    reviewedBy: uuid("reviewed_by"),
    reviewStatus: reviewStatusEnum("review_status"),
    reviewNote: text("review_note"),

    dueDate: timestamp("due_date", { withTimezone: true }),
    startDate: timestamp("start_date", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    archivedAt: timestamp("archived_at", { withTimezone: true }),

    estimatedHours: numeric("estimated_hours", { precision: 6, scale: 2 }),
    actualHours: numeric("actual_hours", { precision: 6, scale: 2 }).default(
      "0",
    ),
    points: integer("points"),
    progress: integer("progress").default(0),

    tags: jsonb("tags")
      .$type<string[]>()
      .default(sql`'[]'::jsonb`),
    customFields: jsonb("custom_fields")
      .$type<Record<string, unknown>>()
      .default(sql`'{}'::jsonb`),

    subTaskCount: integer("sub_task_count").notNull().default(0),
    subTaskCompletedCount: integer("sub_task_completed_count")
      .notNull()
      .default(0),
    commentCount: integer("comment_count").notNull().default(0),
    attachmentCount: integer("attachment_count").notNull().default(0),
    openObstacleCount: integer("open_obstacle_count").notNull().default(0),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [
    index("tasks_company_id_idx").on(t.companyId),
    index("tasks_project_id_idx").on(t.projectId),
    index("tasks_assigned_to_idx").on(t.assignedTo),
    index("tasks_status_idx").on(t.status),
    index("tasks_due_date_idx").on(t.dueDate),
    index("tasks_parent_task_id_idx").on(t.parentTaskId),
    uniqueIndex("tasks_short_id_company_idx").on(t.shortId, t.companyId),
    check("tasks_progress_range", sql`${t.progress} BETWEEN 0 AND 100`),
    check("tasks_actual_hours_positive", sql`${t.actualHours} >= 0`),
  ],
);

export const taskMembers = pgTable(
  "task_members",
  {
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    role: text("role").notNull().default("contributor"),
    addedAt: timestamp("added_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    addedBy: uuid("added_by").notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.taskId, t.userId] }),
    index("task_members_user_id_idx").on(t.userId),
  ],
);

export const subTasks = pgTable(
  "sub_tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    status: subTaskStatusEnum("status").notNull().default("pending"),
    assignedTo: uuid("assigned_to"),
    dueDate: timestamp("due_date", { withTimezone: true }),
    sortOrder: integer("sort_order").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("sub_tasks_task_id_idx").on(t.taskId),
    index("sub_tasks_assigned_to_idx").on(t.assignedTo),
  ],
);

export const taskDependencies = pgTable(
  "task_dependencies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fromTaskId: uuid("from_task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    toTaskId: uuid("to_task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    type: dependencyTypeEnum("type").notNull(),
    note: text("note"),
    createdBy: uuid("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("task_deps_unique_idx").on(t.fromTaskId, t.toTaskId, t.type),
    index("task_deps_to_task_id_idx").on(t.toTaskId),
    check("task_deps_no_self_ref", sql`${t.fromTaskId} <> ${t.toTaskId}`),
  ],
);

export const taskAttachments = pgTable(
  "task_attachments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    uploadedBy: uuid("uploaded_by").notNull(),
    type: attachmentTypeEnum("type").notNull().default("other"),
    fileName: text("file_name").notNull(),
    fileSize: integer("file_size"),
    mimeType: text("mime_type"),
    url: text("url").notNull(),
    storageKey: text("storage_key"),
    thumbnailUrl: text("thumbnail_url"),
    isExternal: boolean("is_external").notNull().default(false),
    externalProvider: text("external_provider"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [index("task_attachments_task_id_idx").on(t.taskId)],
);

export const taskComments = pgTable(
  "task_comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    parentCommentId: uuid("parent_comment_id"),
    content: text("content").notNull(),
    contentRich: jsonb("content_rich"),
    mentions: jsonb("mentions")
      .$type<string[]>()
      .default(sql`'[]'::jsonb`),
    attachments: jsonb("attachments")
      .$type<string[]>()
      .default(sql`'[]'::jsonb`),
    isEdited: boolean("is_edited").notNull().default(false),
    editedAt: timestamp("edited_at", { withTimezone: true }),
    isPinned: boolean("is_pinned").notNull().default(false),
    isResolved: boolean("is_resolved").notNull().default(false),
    resolvedBy: uuid("resolved_by"),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [
    index("task_comments_task_id_idx").on(t.taskId),
    index("task_comments_parent_id_idx").on(t.parentCommentId),
    index("task_comments_user_id_idx").on(t.userId),
  ],
);

export const commentReactions = pgTable(
  "comment_reactions",
  {
    commentId: uuid("comment_id")
      .notNull()
      .references(() => taskComments.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    reaction: commentReactionEnum("reaction").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.commentId, t.userId, t.reaction] })],
);

export const obstacles = pgTable(
  "obstacles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    reportedBy: uuid("reported_by").notNull(),
    category: obstacleCategoryEnum("category").notNull(),
    status: obstacleStatusEnum("status").notNull().default("open"),
    reason: text("reason").notNull(),
    resolution: text("resolution"),
    blockedByTaskId: uuid("blocked_by_task_id").references(() => tasks.id, {
      onDelete: "set null",
    }),
    severity: taskUrgencyEnum("severity").notNull().default("medium"),
    resolvedBy: uuid("resolved_by"),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("obstacles_task_id_idx").on(t.taskId),
    index("obstacles_status_idx").on(t.status),
  ],
);

export const userWorkedOnTask = pgTable(
  "user_worked_on_task",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    hoursWorked: numeric("hours_worked", { precision: 6, scale: 2 }),
    sessionNotes: text("session_notes"),
    isActive: boolean("is_active").notNull().default(false),
    billable: boolean("billable").notNull().default(true),
    source: text("source").notNull().default("manual"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("uwot_task_id_idx").on(t.taskId),
    index("uwot_user_id_idx").on(t.userId),
    index("uwot_started_at_idx").on(t.startedAt),
    check(
      "uwot_hours_positive",
      sql`${t.hoursWorked} IS NULL OR ${t.hoursWorked} >= 0`,
    ),
    check(
      "uwot_end_after_start",
      sql`${t.endedAt} IS NULL OR ${t.endedAt} > ${t.startedAt}`,
    ),
  ],
);

export const taskActivities = pgTable(
  "task_activities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    type: taskActivityTypeEnum("type").notNull(),
    metadata: jsonb("metadata")
      .$type<Record<string, unknown>>()
      .default(sql`'{}'::jsonb`),

    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("task_activities_task_id_idx").on(t.taskId),
    index("task_activities_user_id_idx").on(t.userId),
    index("task_activities_type_idx").on(t.type),
    index("task_activities_created_at_idx").on(t.createdAt),
  ],
);

export const taskTemplates = pgTable(
  "task_templates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id").notNull(),
    projectId: uuid("project_id"),
    createdBy: uuid("created_by").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    isPublic: boolean("is_public").notNull().default(false),
    templateData: jsonb("template_data").notNull().$type<{
      title?: string;
      description?: string;
      urgency?: string;
      difficulty?: string;
      estimatedHours?: number;
      points?: number;
      tags?: string[];
      subTasks?: Array<{ title: string; description?: string }>;
      customFields?: Record<string, unknown>;
    }>(),
    usageCount: integer("usage_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("task_templates_company_id_idx").on(t.companyId)],
);

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  parentTask: one(tasks, {
    fields: [tasks.parentTaskId],
    references: [tasks.id],
    relationName: "task_hierarchy",
  }),
  childTasks: many(tasks, { relationName: "task_hierarchy" }),
  members: many(taskMembers),
  subTasks: many(subTasks),
  attachments: many(taskAttachments),
  comments: many(taskComments),
  obstacles: many(obstacles),
  timeLogs: many(userWorkedOnTask),
  activities: many(taskActivities),
  outgoingDeps: many(taskDependencies, { relationName: "dep_from" }),
  incomingDeps: many(taskDependencies, { relationName: "dep_to" }),
}));

export const subTasksRelations = relations(subTasks, ({ one }) => ({
  task: one(tasks, { fields: [subTasks.taskId], references: [tasks.id] }),
}));

export const taskMembersRelations = relations(taskMembers, ({ one }) => ({
  task: one(tasks, { fields: [taskMembers.taskId], references: [tasks.id] }),
}));

export const taskAttachmentsRelations = relations(
  taskAttachments,
  ({ one }) => ({
    task: one(tasks, {
      fields: [taskAttachments.taskId],
      references: [tasks.id],
    }),
  }),
);

export const taskCommentsRelations = relations(
  taskComments,
  ({ one, many }) => ({
    task: one(tasks, { fields: [taskComments.taskId], references: [tasks.id] }),
    parentComment: one(taskComments, {
      fields: [taskComments.parentCommentId],
      references: [taskComments.id],
      relationName: "comment_thread",
    }),
    replies: many(taskComments, { relationName: "comment_thread" }),
    reactions: many(commentReactions),
  }),
);

export const commentReactionsRelations = relations(
  commentReactions,
  ({ one }) => ({
    comment: one(taskComments, {
      fields: [commentReactions.commentId],
      references: [taskComments.id],
    }),
  }),
);

export const obstaclesRelations = relations(obstacles, ({ one }) => ({
  task: one(tasks, { fields: [obstacles.taskId], references: [tasks.id] }),
  blockedByTask: one(tasks, {
    fields: [obstacles.blockedByTaskId],
    references: [tasks.id],
    relationName: "obstacle_blocker",
  }),
}));

export const userWorkedOnTaskRelations = relations(
  userWorkedOnTask,
  ({ one }) => ({
    task: one(tasks, {
      fields: [userWorkedOnTask.taskId],
      references: [tasks.id],
    }),
  }),
);

export const taskActivitiesRelations = relations(taskActivities, ({ one }) => ({
  task: one(tasks, { fields: [taskActivities.taskId], references: [tasks.id] }),
}));

export const taskDependenciesRelations = relations(
  taskDependencies,
  ({ one }) => ({
    fromTask: one(tasks, {
      fields: [taskDependencies.fromTaskId],
      references: [tasks.id],
      relationName: "dep_from",
    }),
    toTask: one(tasks, {
      fields: [taskDependencies.toTaskId],
      references: [tasks.id],
      relationName: "dep_to",
    }),
  }),
);

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type SubTask = typeof subTasks.$inferSelect;
export type NewSubTask = typeof subTasks.$inferInsert;
export type TaskMember = typeof taskMembers.$inferSelect;
export type TaskAttachment = typeof taskAttachments.$inferSelect;
export type TaskComment = typeof taskComments.$inferSelect;
export type NewTaskComment = typeof taskComments.$inferInsert;
export type CommentReaction = typeof commentReactions.$inferSelect;
export type Obstacle = typeof obstacles.$inferSelect;
export type NewObstacle = typeof obstacles.$inferInsert;
export type TimeLog = typeof userWorkedOnTask.$inferSelect;
export type NewTimeLog = typeof userWorkedOnTask.$inferInsert;
export type TaskActivity = typeof taskActivities.$inferSelect;
export type TaskDependency = typeof taskDependencies.$inferSelect;
export type TaskTemplate = typeof taskTemplates.$inferSelect;
