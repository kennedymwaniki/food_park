DO $$ BEGIN
 CREATE TYPE "public"."size" AS ENUM('large', 'small', 'medium');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"reviewId" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"content" text NOT NULL,
	"createed_at" timestamp DEFAULT now(),
	"rating" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menu" ADD COLUMN "description" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "size" "size" DEFAULT 'small';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
