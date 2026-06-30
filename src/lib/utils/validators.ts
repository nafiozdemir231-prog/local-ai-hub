import { z } from 'zod';

export const shareConfigSchema = z.object({
  platform: z.enum(['CUDA', 'MLX', 'ROCm', 'Vulkan', 'Multi-GPU']),
  vram: z.enum(['4','6','8','12','16','24','32','64','96','128+']),
  ram: z.enum(['8','16','24','32','48','64','96','128+']),
  hardwareModel: z.string().min(2).max(100),
  modelName: z.string().min(2).max(200),
  quantization: z.string().min(1).max(50),
  contextSize: z.coerce.number().int().positive(),
  kvCache: z.string().min(1).max(50),
  llmRunner: z.string().max(100).optional(),
  ppSpeed: z.coerce.number().positive(),
  tgSpeed: z.coerce.number().positive(),
  note: z.string().max(500).optional(),
  generalSettings: z.string().max(2000).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1).max(2000),
});

export const modelRatingSchema = z.object({
  modelName: z.string().min(1).max(200),
  configId: z.string().optional(),
  category: z.enum(['Coding','Intelligence']),
  rating: z.number().int().min(1).max(5),
});
