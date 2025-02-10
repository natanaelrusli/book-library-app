CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED', 'LATE');--> statement-breakpoint
ALTER TABLE "borrow_history" RENAME COLUMN "borrow_statue" TO "borrow_status";--> statement-breakpoint
ALTER TABLE "book" ALTER COLUMN "total_copies" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "book" ALTER COLUMN "available_copies" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "profile_picture" varchar;