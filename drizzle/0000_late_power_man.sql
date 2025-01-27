CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "book" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar NOT NULL,
	"genre" varchar NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	"total_copies" integer,
	"available_copies" integer,
	"description" varchar(255) NOT NULL,
	"color" varchar NOT NULL,
	"cover" varchar NOT NULL,
	"video" varchar,
	"summary" varchar NOT NULL,
	"is_loaned_book" boolean DEFAULT false NOT NULL,
	CONSTRAINT "book_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"university_id" integer NOT NULL,
	"password" text NOT NULL,
	"university_card" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"role" "role" DEFAULT 'USER',
	"last_activity_date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_university_id_unique" UNIQUE("university_id")
);
