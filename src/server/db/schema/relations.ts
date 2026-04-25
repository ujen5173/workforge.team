import { relations } from "drizzle-orm";
import { leaveRequests } from "./leave";
import { invitation, member, organization } from "./organization";
import {
  discussions,
  projectMembers,
  projects,
  taskAssignees,
  tasks,
} from "./projects";
import { account, session, user } from "./users";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  memberships: many(member),
  discussions: many(discussions),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  invitations: many(invitation),
  projects: many(projects),
}));

export const memberRelations = relations(member, ({ one, many }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
  projectMemberships: many(projectMembers),
  taskAssignments: many(taskAssignees),
  createdProjects: many(projects),
  // Two separate relations to the same table (leaveRequests) need explicit names
  leaveRequests: many(leaveRequests, { relationName: "leaveRequester" }),
  leaveReviews: many(leaveRequests, { relationName: "leaveReviewer" }),
  // Two separate relations to tasks
  assignedTasks: many(tasks, { relationName: "taskAssignedBy" }),
}));

export const invitationRelations = relations(invitation, ({ one }) => ({
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id],
  }),
  inviter: one(member, {
    fields: [invitation.inviterId],
    references: [member.id],
  }),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  organization: one(organization, {
    fields: [projects.organizationId],
    references: [organization.id],
  }),
  createdBy: one(member, {
    fields: [projects.createdById],
    references: [member.id],
  }),
  members: many(projectMembers),
  tasks: many(tasks),
  discussions: many(discussions),
}));

export const projectMemberRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  member: one(member, {
    fields: [projectMembers.memberId],
    references: [member.id],
  }),
}));

export const taskRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  assignedBy: one(member, {
    fields: [tasks.assignedById],
    references: [member.id],
    relationName: "taskAssignedBy",
  }),
  assignees: many(taskAssignees),
  // Self-referential: subtasks
  parent: one(tasks, {
    fields: [tasks.parentId],
    references: [tasks.id],
    relationName: "subtaskParent",
  }),
  subtasks: many(tasks, { relationName: "subtaskParent" }),
}));

export const taskAssigneeRelations = relations(taskAssignees, ({ one }) => ({
  task: one(tasks, {
    fields: [taskAssignees.taskId],
    references: [tasks.id],
  }),
  member: one(member, {
    fields: [taskAssignees.memberId],
    references: [member.id],
  }),
}));

export const discussionRelations = relations(discussions, ({ one, many }) => ({
  project: one(projects, {
    fields: [discussions.projectId],
    references: [projects.id],
  }),
  author: one(user, {
    fields: [discussions.authorId],
    references: [user.id],
  }),
  parent: one(discussions, {
    fields: [discussions.parentId],
    references: [discussions.id],
    relationName: "discussionThread",
  }),
  replies: many(discussions, { relationName: "discussionThread" }),
}));

export const leaveRequestRelations = relations(leaveRequests, ({ one }) => ({
  member: one(member, {
    fields: [leaveRequests.memberId],
    references: [member.id],
    relationName: "leaveRequester",
  }),
  reviewedBy: one(member, {
    fields: [leaveRequests.reviewedById],
    references: [member.id],
    relationName: "leaveReviewer",
  }),
}));
