ALTER TABLE "organization" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "logo" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "member_count" integer DEFAULT 0 NOT NULL;