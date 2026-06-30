import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import { modelRatingSchema } from "@/lib/utils/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = modelRatingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const rating = await prisma.modelRating.upsert({
      where: {
        userId_modelName_category: {
          userId: session.user.id,
          modelName: result.data.modelName,
          category: result.data.category,
        },
      },
      update: { rating: result.data.rating },
      create: {
        ...result.data,
        userId: session.user.id,
        configId: result.data.configId || null,
        rating: result.data.rating ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: rating });
  } catch (error) {
    console.error("[RATE_POST]", error);
    return NextResponse.json(
      { error: "Failed to rate" },
      { status: 500 }
    );
  }
}
