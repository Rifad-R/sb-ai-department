import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// PUT update faculty
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, designation, qualifications, specialization, email } = body;

    const faculty = await prisma.faculty.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(designation && { designation }),
        ...(qualifications !== undefined && { qualifications }),
        ...(specialization !== undefined && { specialization }),
        ...(email !== undefined && { email }),
      },
    });

    return NextResponse.json(faculty);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update faculty" }, { status: 500 });
  }
}

// DELETE faculty
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.faculty.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete faculty" }, { status: 500 });
  }
}
