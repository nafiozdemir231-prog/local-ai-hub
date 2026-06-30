import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";

export const runtime = "nodejs";

interface ModelRatingGroup {
  modelName: string;
  totalRating: number;
  totalVotes: number;
  avgRating: number;
  category: string;
  configId: string | null;
  config: {
    modelName: string;
    hardwareModel: string;
    platform: string;
    quantization: string;
    contextSize: number;
    vram: string;
    ram: string;
  } | null;
}

export async function GET() {
  try {
    // LLMConfig'lardan otomatik ModelRatings oluştur
    const configs = await prisma.lLMConfig.findMany({
      select: {
        id: true,
        modelName: true,
        hardwareModel: true,
        platform: true,
        quantization: true,
        contextSize: true,
        vram: true,
        ram: true,
        userId: true,
      },
    });

    // Her config için Intelligence ve Coding category'lerinde ModelRatings oluştur
    for (const config of configs) {
      // Intelligence kategorisi
      await prisma.modelRating.upsert({
        where: {
          userId_modelName_category: {
            userId: config.userId,
            modelName: config.modelName,
            category: "Intelligence",
          },
        },
        update: {
          rating: { increment: 0 },
        },
        create: {
          userId: config.userId,
          modelName: config.modelName,
          configId: config.id,
          category: "Intelligence",
          rating: 0,
        },
      });

      // Coding kategorisi
      await prisma.modelRating.upsert({
        where: {
          userId_modelName_category: {
            userId: config.userId,
            modelName: config.modelName,
            category: "Coding",
          },
        },
        update: {
          rating: { increment: 0 },
        },
        create: {
          userId: config.userId,
          modelName: config.modelName,
          configId: config.id,
          category: "Coding",
          rating: 0,
        },
      });
    }

    // Intelligence kategorisindeki ModelRatings'ı getir
    const intelligenceRatings = await prisma.modelRating.findMany({
      where: {
        category: "Intelligence",
      },
      select: {
        modelName: true,
        rating: true,
        category: true,
        configId: true,
        config: {
          select: {
            modelName: true,
            hardwareModel: true,
            platform: true,
            quantization: true,
            contextSize: true,
            vram: true,
            ram: true,
          },
        },
      },
    });

    // Coding kategorisindeki ModelRatings'ı getir
    const codingRatings = await prisma.modelRating.findMany({
      where: {
        category: "Coding",
      },
      select: {
        modelName: true,
        rating: true,
        category: true,
        configId: true,
        config: {
          select: {
            modelName: true,
            hardwareModel: true,
            platform: true,
            quantization: true,
            contextSize: true,
            vram: true,
            ram: true,
          },
        },
      },
    });

    // Intelligence gruplama
    const intelligenceGrouped: Record<string, ModelRatingGroup> = {};

    for (const rating of intelligenceRatings) {
      const key = `${rating.modelName}`;
      const totalRating = rating.rating || 0;
      const totalVotes = 1;
      const avgRating = parseFloat((totalRating / totalVotes).toFixed(1));

      if (!intelligenceGrouped[key]) {
        intelligenceGrouped[key] = {
          modelName: rating.modelName,
          totalRating,
          totalVotes,
          avgRating,
          category: "Intelligence",
          configId: rating.configId,
          config: rating.config,
        };
      } else {
        intelligenceGrouped[key].totalRating += totalRating;
        intelligenceGrouped[key].totalVotes += totalVotes;
        intelligenceGrouped[key].avgRating = parseFloat(
          (intelligenceGrouped[key].totalRating / intelligenceGrouped[key].totalVotes).toFixed(1)
        );
      }
    }

    // Coding gruplama
    const codingGrouped: Record<string, ModelRatingGroup> = {};

    for (const rating of codingRatings) {
      const key = `${rating.modelName}`;
      const totalRating = rating.rating || 0;
      const totalVotes = 1;
      const avgRating = parseFloat((totalRating / totalVotes).toFixed(1));

      if (!codingGrouped[key]) {
        codingGrouped[key] = {
          modelName: rating.modelName,
          totalRating,
          totalVotes,
          avgRating,
          category: "Coding",
          configId: rating.configId,
          config: rating.config,
        };
      } else {
        codingGrouped[key].totalRating += totalRating;
        codingGrouped[key].totalVotes += totalVotes;
        codingGrouped[key].avgRating = parseFloat(
          (codingGrouped[key].totalRating / codingGrouped[key].totalVotes).toFixed(1)
        );
      }
    }

    const intelligenceModels = Object.values(intelligenceGrouped);
    const codingModels = Object.values(codingGrouped);

    const sortedIntelligence = [...intelligenceModels].sort((a, b) => b.avgRating - a.avgRating);
    const sortedCoding = [...codingModels].sort((a, b) => b.avgRating - a.avgRating);

    return NextResponse.json({ success: true, data: { intelligence: sortedIntelligence, coding: sortedCoding } });
  } catch (error) {
    console.error("[RANKINGS_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
