import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export enum StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
  "LATE",
]);

export const BorrowStatusEnum = Object(
  Object.fromEntries(
    BORROW_STATUS_ENUM.enumValues.map((status) => [status, status]),
  ) as { [K in (typeof BORROW_STATUS_ENUM.enumValues)[number]]: K },
);

export const users = pgTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", {
    length: 255,
  }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  booksBorrowed: integer("book_borrowed").default(0),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").notNull().defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const books = pgTable("book", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  author: varchar("author").notNull(),
  genre: varchar("genre").notNull(),
  rating: integer("rating").notNull().default(1),
  totalCopies: integer("total_copies").notNull(),
  availableCopies: integer("available_copies").notNull(),
  description: varchar("description", {
    length: 255,
  }).notNull(),
  color: varchar("color").notNull(),
  cover: varchar("cover").notNull(),
  video: varchar("video"),
  summary: varchar("summary").notNull(),
  isLoanedBook: boolean("is_loaned_book").default(false).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const borrowHistory = pgTable("borrow_history", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  bookId: uuid("book_id").references(() => books.id),
  userId: uuid("user_id").references(() => users.id),
  borrowStatus: BORROW_STATUS_ENUM("borrow_status").default("BORROWED"),
  borrowDate: timestamp("borrow_date", {
    withTimezone: true,
  }).defaultNow(),
  returnDate: timestamp("return_date", {
    withTimezone: true,
  }),
  dueDate: timestamp("due_date", {
    withTimezone: true,
  }),
  receipt: varchar("receipt"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
