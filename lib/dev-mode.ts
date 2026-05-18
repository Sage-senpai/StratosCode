/**
 * Centralized check for dev-mock mode.
 *
 * When STRATOSCODE_DEV_MOCK is "true", AWS SDK calls fall back to deterministic
 * mock data and a dev Credentials provider is enabled. This lets the UI run
 * locally without real AWS resources or a Cognito user pool.
 */
export const isDevMock = (): boolean => {
  return process.env.STRATOSCODE_DEV_MOCK === "true";
};

/**
 * Throws in production if a required env var is missing.
 * In dev-mock mode, returns a placeholder so SDK clients can be constructed
 * even when no real AWS credentials are present.
 */
export function requireEnv(name: string, devFallback = "dev-placeholder"): string {
  const value = process.env[name];
  if (value && value.length > 0) return value;
  if (isDevMock()) return devFallback;
  throw new Error(`Missing required environment variable: ${name}`);
}
