import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import { isAdmin } from "@/lib/utils/admin";

export const runtime = "nodejs";

// DELETE — Rating silme (Admin veya Sahip)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ ratingId: string }> }
) {
  try {
    const { ratingId } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rating = await prisma.modelRating.findUnique({
      where: { id: ratingId },
    });

    if (!rating) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const userIsAdmin = await isAdmin(session.user.id);
    if (rating.userId !== session.user.id && !userIsAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.modelRating.delete({ where: { id: ratingId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[RATING_DELETE]", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
