import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ configId: string }> }
) {
  try {
    const { configId } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingVote = await prisma.configVote.findUnique({
      where: {
        userId_configId: { userId: session.user.id, configId },
      },
    });

    if (existingVote) {
      // Toggle: Oyu kaldır
      await prisma.$transaction([
        prisma.configVote.delete({ where: { id: existingVote.id } }),
        prisma.lLMConfig.update({
          where: { id: configId },
          data: { starCount: { decrement: 1 } },
        }),
      ]);
      return NextResponse.json({ voted: false });
    } else {
      // Oy ver
      await prisma.$transaction([
        prisma.configVote.create({
          data: { userId: session.user.id, configId },
        }),
        prisma.lLMConfig.update({
          where: { id: configId },
          data: { starCount: { increment: 1 } },
        }),
      ]);
      return NextResponse.json({ voted: true });
    }
  } catch (error) {
    console.error("[VOTE_POST]", error);
    return NextResponse.json(
      { error: "Failed to vote" },
      { status: 500 }
    );
  }
}
