/**
 * Shared AWS client config. Keeps region resolution and credential behavior
 * consistent across S3/SFN/Bedrock/DDB/SageMaker clients.
 *
 * In dev-mock mode, clients are still constructed but their methods short-circuit
 * to mock data before any network call is made.
 */
export function awsClientConfig() {
  return {
    region: process.env.AWS_REGION ?? "us-east-1",
    // SDK will pick up credentials from env vars or the default credential chain.
  };
}

const RETRYABLE_CODES = new Set([
  "ThrottlingException",
  "TooManyRequestsException",
  "RequestThrottled",
  "ProvisionedThroughputExceededException",
  "ServiceUnavailable",
  "InternalServerError",
]);

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: { retries?: number; baseDelayMs?: number; label?: string } = {},
): Promise<T> {
  const retries = opts.retries ?? 4;
  const baseDelay = opts.baseDelayMs ?? 250;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const code = (err as { name?: string; Code?: string })?.name ??
        (err as { Code?: string })?.Code;
      const isRetryable = code && RETRYABLE_CODES.has(code);
      if (!isRetryable || attempt === retries) throw err;
      const delay = baseDelay * 2 ** attempt + Math.random() * 100;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}
