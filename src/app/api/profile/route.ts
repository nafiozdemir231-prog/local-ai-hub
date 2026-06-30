import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import { isAdmin } from "@/lib/utils/admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth();

    console.log('[PROFILE_API] session:', JSON.stringify(session, null, 2));

    const userId = session?.user?.id || session?.user?.sub;
    console.log('[PROFILE_API] userId:', userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIsAdmin = await isAdmin(userId);
    let configs;

    if (userIsAdmin) {
      // Admin tüm config'leri görebilir
      configs = await prisma.lLMConfig.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
          votes: true,
        },
      });
    } else {
      // Normal kullanıcı sadece kendi config'lerini görür
      configs = await prisma.lLMConfig.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        include: {
          votes: true,
        },
      });
    }

    return NextResponse.json({ success: true, data: configs });
  } catch (error) {
    console.error("[PROFILE_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
