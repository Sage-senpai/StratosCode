import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { awsClientConfig, withRetry } from "./_client";
import { isDevMock } from "../dev-mode";
import { logger } from "../logger";

const client = new S3Client(awsClientConfig());

const bucket = (): string => process.env.S3_BUCKET_NAME ?? "stratoscode-artifacts";

export function buildJobKey(
  tenantId: string,
  jobId: string,
  filename: string,
  direction: "input" | "output" = "input",
): string {
  return `${tenantId}/${jobId}/${direction}/${filename}`;
}

export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 900,
): Promise<string> {
  if (isDevMock()) {
    logger.debug({ key }, "dev-mock: returning fake presigned upload URL");
    return `https://dev-mock.stratoscode.local/upload?key=${encodeURIComponent(key)}`;
  }
  const command = new PutObjectCommand({
    Bucket: bucket(),
    Key: key,
    ContentType: contentType,
  });
  return withRetry(() => getSignedUrl(client, command, { expiresIn }), {
    label: "s3.getPresignedUploadUrl",
  });
}

export async function getPresignedDownloadUrl(
  key: string,
  expiresIn = 900,
): Promise<string> {
  if (isDevMock()) {
    logger.debug({ key }, "dev-mock: returning fake presigned download URL");
    return `https://dev-mock.stratoscode.local/download?key=${encodeURIComponent(key)}`;
  }
  const command = new GetObjectCommand({ Bucket: bucket(), Key: key });
  return withRetry(() => getSignedUrl(client, command, { expiresIn }), {
    label: "s3.getPresignedDownloadUrl",
  });
}
