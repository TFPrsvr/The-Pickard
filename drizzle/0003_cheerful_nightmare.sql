CREATE TABLE IF NOT EXISTS "vehicle_drive_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"engine_id" integer NOT NULL,
	"drive_type" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_engines" (
	"id" serial PRIMARY KEY NOT NULL,
	"year_make_model_id" integer NOT NULL,
	"engine_name" varchar(150) NOT NULL,
	"displacement" varchar(50),
	"cylinders" integer,
	"configuration" varchar(20),
	"fuel_type" varchar(50),
	"horsepower" integer,
	"torque" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_makes" (
	"id" serial PRIMARY KEY NOT NULL,
	"make_id" integer,
	"make_name" varchar(100) NOT NULL,
	"category" varchar(20) NOT NULL,
	"year_start" integer,
	"year_end" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "vehicle_makes_make_id_unique" UNIQUE("make_id"),
	CONSTRAINT "vehicle_makes_make_name_unique" UNIQUE("make_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_models" (
	"id" serial PRIMARY KEY NOT NULL,
	"make_id" integer NOT NULL,
	"model_id" integer,
	"model_name" varchar(150) NOT NULL,
	"category" varchar(20) NOT NULL,
	"year_start" integer,
	"year_end" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_trims" (
	"id" serial PRIMARY KEY NOT NULL,
	"year_make_model_id" integer NOT NULL,
	"trim_name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_year_make_models" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"make_id" integer NOT NULL,
	"model_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle_drive_types" ADD CONSTRAINT "vehicle_drive_types_engine_id_vehicle_engines_id_fk" FOREIGN KEY ("engine_id") REFERENCES "public"."vehicle_engines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle_engines" ADD CONSTRAINT "vehicle_engines_year_make_model_id_vehicle_year_make_models_id_fk" FOREIGN KEY ("year_make_model_id") REFERENCES "public"."vehicle_year_make_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_make_id_vehicle_makes_id_fk" FOREIGN KEY ("make_id") REFERENCES "public"."vehicle_makes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle_trims" ADD CONSTRAINT "vehicle_trims_year_make_model_id_vehicle_year_make_models_id_fk" FOREIGN KEY ("year_make_model_id") REFERENCES "public"."vehicle_year_make_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle_year_make_models" ADD CONSTRAINT "vehicle_year_make_models_make_id_vehicle_makes_id_fk" FOREIGN KEY ("make_id") REFERENCES "public"."vehicle_makes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle_year_make_models" ADD CONSTRAINT "vehicle_year_make_models_model_id_vehicle_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."vehicle_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
