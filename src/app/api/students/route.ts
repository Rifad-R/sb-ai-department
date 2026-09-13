import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET all students (public)
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}

// POST new student (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, rollNo, batch, tags } = body;

    if (!name || !rollNo) {
      return NextResponse.json({ error: "Name and Roll No are required" }, { status: 400 });
    }

    const student = await prisma.student.create({
      data: {
        name,
        rollNo,
        batch: batch || "2026-2030",
        tags: JSON.stringify(tags || []),
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Roll number already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
  }
}
