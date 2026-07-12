import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const feedbacks = await prisma.$queryRaw<any[]>`
      SELECT id, created_at AS "createdAt", name, content
      FROM runner_feedback
      ORDER BY created_at DESC
      LIMIT 50
    `;
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Failed to fetch runner feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, content } = body;

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const result = await prisma.$executeRaw`
      INSERT INTO runner_feedback (name, content)
      VALUES (${name?.trim() || "Anonymous"}, ${content.trim()})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to create runner feedback:", error);
    return NextResponse.json(
      { error: "Failed to create feedback" },
      { status: 500 }
    );
  }
}
