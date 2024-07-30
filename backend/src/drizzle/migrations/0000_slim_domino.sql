DO $$ BEGIN
 CREATE TYPE "public"."addressType" AS ENUM('home', 'offiice');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."orderStatus" AS ENUM('pending', 'confirmed', 'ready');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."valid" AS ENUM('unused', 'used');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"addressId" serial PRIMARY KEY NOT NULL,
	"house" varchar NOT NULL,
	"street" varchar NOT NULL,
	"city" varchar NOT NULL,
	"addresstype" "addressType" DEFAULT 'home' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"commentId" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar NOT NULL,
	"content" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu" (
	"menuId" serial PRIMARY KEY NOT NULL,
	"image" varchar NOT NULL,
	"name" varchar NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"orderId" serial PRIMARY KEY NOT NULL,
	"totalPrice" integer NOT NULL,
	"userId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"orderStatus" "orderStatus" DEFAULT 'pending',
	"priority" boolean,
	"create_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"userId" serial PRIMARY KEY NOT NULL,
	"image" varchar,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vouchers" (
	"voucherId" serial PRIMARY KEY NOT NULL,
	"voucherCode" varchar NOT NULL,
	"validPeriod" integer,
	"status" "valid" DEFAULT 'unused'
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
