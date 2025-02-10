import { RoleEnum, StatusEnum, users } from "@/db/schema";
import { db } from "@/db/drizzle";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

async function seedUsers() {
  for (let i = 1; i <= 100; i++) {
    const values = {
      fullName: `John Doe ${i}`,
      email: `john.doe${i}zzzz@example.com`,
      universityId: 123456 + i + i,
      password: "password123",
      universityCard: `https://dummyimage.com/600x400/000/fff&text=UC${i}`,
      status: StatusEnum.APPROVED,
      booksBorrowed: 2,
      role: RoleEnum.USER,
      profilePicture: `https://dummyimage.com/600x400/000/fff&text=UC${i}`,
    };

    const hashedPassword = await hash(values.password, 10);

    await db.insert(users).values({
      fullName: values.fullName,
      email: values.email,
      universityId: values.universityId,
      universityCard: values.universityCard,
      password: hashedPassword,
      role: values.role,
      profilePicture: values.profilePicture,
    });
  }
}

export async function GET() {
  try {
    await seedUsers();
    return NextResponse.json({ message: "Users seeded successfully" });
  } catch (error) {
    console.error("Error seeding users:", error);
    return NextResponse.json({ error: "Error seeding users" });
  }
}
