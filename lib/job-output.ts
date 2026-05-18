/**
 * Single seam for transformation output: presigned download URLs, diff files,
 * and lineage. Keeps the dev-mock branching out of the UI layer.
 *
 * Real AWS path is a TODO (fetch lineage.json + diff manifest from S3); for now
 * the prod branch returns empty arrays so the UI shows its "no data yet" state
 * instead of leaking dev mocks. The seam is the right shape to swap in later.
 */
import { getPresignedDownloadUrl } from "./aws/s3";
import { isDevMock } from "./dev-mode";
import { mockDiffFiles, mockLineage, type MockDiffFile } from "./aws/mocks";
import type { LineageEntry, TransformationJob } from "@/types/transformation";

export interface JobOutput {
  downloads: {
    bundle: string;
    iac: string;
    tests: string;
    adr: string;
  };
  diffFiles: MockDiffFile[];
  lineage: LineageEntry[];
}

function outputPrefix(job: TransformationJob): string {
  return `${job.tenantId}/${job.jobId}/output/`;
}

export async function getJobOutput(job: TransformationJob): Promise<JobOutput> {
  const base = outputPrefix(job);
  const [bundle, iac, tests, adr] = await Promise.all([
    getPresignedDownloadUrl(`${base}bundle.zip`),
    getPresignedDownloadUrl(`${base}iac.zip`),
    getPresignedDownloadUrl(`${base}tests.zip`),
    getPresignedDownloadUrl(`${base}adr.pdf`),
  ]);

  if (isDevMock()) {
    return {
      downloads: { bundle, iac, tests, adr },
      diffFiles: mockDiffFiles(job.sourceLanguage, job.targetLanguage),
      lineage: mockLineage(job.sourceLanguage, job.targetLanguage),
    };
  }

  // TODO: fetch lineage.json + diff manifest from the real S3 output bundle.
  return {
    downloads: { bundle, iac, tests, adr },
    diffFiles: [],
    lineage: [],
  };
}
