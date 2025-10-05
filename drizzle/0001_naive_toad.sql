ALTER TABLE "users" ADD COLUMN "pinterest_profile" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pinterest_boards" json DEFAULT '[]'::json;