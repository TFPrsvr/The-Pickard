CREATE TABLE IF NOT EXISTS "pinterest_pins" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"pinterest_url" text NOT NULL,
	"title" varchar(255),
	"description" text,
	"image_url" text,
	"category" varchar(50),
	"vehicle_types" json DEFAULT '[]'::json,
	"tags" json DEFAULT '[]'::json,
	"status" varchar(20) DEFAULT 'pending',
	"reviewed_by" integer,
	"reviewed_at" timestamp,
	"rejection_reason" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pinterest_pins" ADD CONSTRAINT "pinterest_pins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pinterest_pins" ADD CONSTRAINT "pinterest_pins_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
