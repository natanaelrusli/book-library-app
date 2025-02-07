CREATE TABLE "borrow_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_id" uuid,
	"user_id" uuid,
	"borrow_statue" "borrow_status" DEFAULT 'BORROWED',
	"borrow_date" timestamp with time zone DEFAULT now(),
	"return_date" timestamp with time zone,
	"due_date" timestamp with time zone,
	"receipt" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "borrow_history_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "borrow_history" ADD CONSTRAINT "borrow_history_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_history" ADD CONSTRAINT "borrow_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;