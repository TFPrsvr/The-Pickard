ALTER TABLE "users" ADD COLUMN "saved_vehicle_category" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "saved_vehicle_year" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "saved_vehicle_make" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "saved_vehicle_model" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "saved_vehicle_engine_type" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "saved_vehicle_drive_type" varchar(10);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "saved_vehicle_submodel" varchar(100);