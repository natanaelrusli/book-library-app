import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { NextResponse } from "next/server";

async function seedBooks() {
  for (let i = 1; i <= 20; i++) {
    const values = {
      title: `Book ${i}`,
      author: `Author ${i}`,
      genre: `Genre ${i}`,
      rating: Math.ceil((i / 100) * 5),
      totalCopies: i,
      availableCopies: i,
      description: `Description ${i}`,
      color: "#ffffff",
      cover: `https://dummyimage.com/400x600/000/fff&text=UC${i}`,
      video: "",
      summary: `Summary ${i}`,
      isLoanedBook: i % 2 === 0 ? true : false,
    };

    await db.insert(books).values(values);
  }
}

export async function GET() {
  try {
    await seedBooks();
    return NextResponse.json({ message: "books seeded successfully" });
  } catch (error) {
    console.error("Error seeding books:", error);
    return NextResponse.json({ error: "Error seeding books" });
  }
}
