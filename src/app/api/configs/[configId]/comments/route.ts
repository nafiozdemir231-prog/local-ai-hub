import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import { commentSchema } from "@/lib/utils/validators";
import { isAdmin } from "@/lib/utils/admin";

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

    const body = await request.json();
    const result = commentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content: result.data.content,
        configId,
        userId: session.user.id,
      },
      include: { user: true },
    });

    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    console.error("[COMMENTS_POST]", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const userIsAdmin = await isAdmin(session.user.id);
    if (comment.userId !== session.user.id && !userIsAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.delete({ where: { id: commentId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[COMMENTS_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}
