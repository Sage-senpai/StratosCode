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

/**
 * Schemas for Bedrock model output. The model is asked to return JSON in a
 * specific shape; these guard against silent drift if the model wraps output
 * in prose, returns partial structures, or hallucinates extra fields.
 */

export const transformationPlanSchema = z.object({
  summary: z.string(),
  modules: z.array(
    z.object({
      name: z.string(),
      sourceFiles: z.array(z.string()),
      strategy: z.string(),
      risks: z.array(z.string()),
    }),
  ),
  estimatedDurationMinutes: z.number().nonnegative(),
});

export const iacBundleSchema = z.object({
  cloudformation: z.string(),
  cdk: z.string(),
  notes: z.string(),
});

export const testSuiteSchema = z.object({
  framework: z.string(),
  files: z.array(z.object({ path: z.string(), content: z.string() })),
  coverageTarget: z.number().min(0).max(1),
});

export const adrSchema = z.object({
  title: z.string(),
  status: z.enum(["proposed", "accepted"]),
  context: z.string(),
  decision: z.string(),
  consequences: z.string(),
});
