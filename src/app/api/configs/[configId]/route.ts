import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import { shareConfigSchema } from "@/lib/utils/validators";
import { isAdmin } from "@/lib/utils/admin";

export const runtime = "nodejs";

// GET — Tek config detayı
export async function GET(
  request: Request,
  { params }: { params: Promise<{ configId: string }> }
) {
  try {
    const { configId } = await params;
    const [config, comments] = await prisma.$transaction([
      prisma.lLMConfig.findUnique({
        where: { id: configId },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          platform: true,
          vram: true,
          ram: true,
          hardwareModel: true,
          modelName: true,
          quantization: true,
          contextSize: true,
          kvCache: true,
          ppSpeed: true,
          tgSpeed: true,
          note: true,
          generalSettings: true,
          starCount: true,
          llmRunner: true,
          userId: true,
          user: { select: { name: true, email: true } },
          votes: true,
        },
      }),
      prisma.comment.findMany({
        where: { configId },
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

    if (!config) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { ...config, comments } });
  } catch (error) {
    console.error("[CONFIG_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// PUT — Config güncelleme (Admin veya Sahip)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ configId: string }> }
) {
  try {
    const { configId } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingConfig = await prisma.lLMConfig.findUnique({
      where: { id: configId },
    });

    if (!existingConfig) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const userIsAdmin = await isAdmin(session.user.id);
    if (existingConfig.userId !== session.user.id && !userIsAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = shareConfigSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
    }

    const config = await prisma.lLMConfig.update({
      where: { id: configId },
      data: result.data,
    });

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error("[CONFIG_PUT]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// DELETE — Config silme (Admin veya Sahip)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ configId: string }> }
) {
  try {
    const { configId } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingConfig = await prisma.lLMConfig.findUnique({
      where: { id: configId },
    });

    if (!existingConfig) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const userIsAdmin = await isAdmin(session.user.id);
    if (existingConfig.userId !== session.user.id && !userIsAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.$transaction([
      prisma.configVote.deleteMany({ where: { configId } }),
      prisma.comment.deleteMany({ where: { configId } }),
      prisma.lLMConfig.delete({ where: { id: configId } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONFIG_DELETE]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
