import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/client";

const BASE_URL = "https://aihublocal.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/llm/configs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/models/rankings`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/llm-runner-aio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/local-llm-runners`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/local-llm-webuis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/multimodal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/chat-clients`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic pages: shared LLM config detail pages (/llm/<id>)
  let configPages: MetadataRoute.Sitemap = [];
  try {
    const configs = await prisma.lLMConfig.findMany({
      select: { id: true, updatedAt: true },
    });
    configPages = configs.map((config) => ({
      url: `${BASE_URL}/llm/${config.id}`,
      lastModified: config.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    // DB unavailable (e.g., during build) — serve static pages only
    console.warn("sitemap: could not load LLM configs, skipping dynamic entries", error);
  }

  return [...staticPages, ...configPages];
}

export const dynamic = "force-dynamic";
