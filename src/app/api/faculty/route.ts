import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET all faculty (public)
export async function GET() {
  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(faculty);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch faculty" }, { status: 500 });
  }
}

// POST new faculty (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, designation, qualifications, specialization, email } = body;

    if (!name || !designation) {
      return NextResponse.json({ error: "Name and designation are required" }, { status: 400 });
    }

    const faculty = await prisma.faculty.create({
      data: {
        name,
        designation,
        qualifications: qualifications || "",
        specialization: specialization || "",
        email: email || null,
      },
    });

    return NextResponse.json(faculty, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create faculty" }, { status: 500 });
  }
}
