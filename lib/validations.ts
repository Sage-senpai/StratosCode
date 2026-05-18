import { z } from "zod";
import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from "@/types/transformation";

export const presignedUploadSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.string().min(1).max(255),
  jobId: z.string().uuid(),
});

export const createTransformationSchema = z.object({
  jobId: z.string().uuid(),
  s3InputKey: z.string().min(1),
  filename: z.string().min(1).max(255),
  sourceLanguage: z.enum(SOURCE_LANGUAGES),
  targetLanguage: z.enum(TARGET_LANGUAGES),
  linesOfCode: z.number().int().nonnegative(),
});

export type CreateTransformationInput = z.infer<typeof createTransformationSchema>;
export type PresignedUploadInput = z.infer<typeof presignedUploadSchema>;

export const waitlistSchema = z.object({
  email: z.string().email(),
});
