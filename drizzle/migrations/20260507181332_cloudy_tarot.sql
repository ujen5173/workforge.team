ALTER TABLE "session" RENAME COLUMN "active_organization_id" TO "active_organization_slug";--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "all_organizations" json;