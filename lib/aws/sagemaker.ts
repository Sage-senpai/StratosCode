import {
  SageMakerRuntimeClient,
  InvokeEndpointCommand,
} from "@aws-sdk/client-sagemaker-runtime";
import { awsClientConfig, withRetry } from "./_client";
import { isDevMock } from "../dev-mode";
import { mockTransform } from "./mocks";
import type { TransformPayload, TransformResult } from "@/types/transformation";

const client = new SageMakerRuntimeClient(awsClientConfig());

const endpointName = (): string =>
  process.env.SAGEMAKER_ENDPOINT_NAME ?? "vetuscloud-transform";

export async function invokeTransformationEndpoint(
  payload: TransformPayload,
): Promise<TransformResult> {
  if (isDevMock()) {
    return mockTransform({ sourceCode: payload.sourceCode });
  }
  const command = new InvokeEndpointCommand({
    EndpointName: endpointName(),
    ContentType: "application/json",
    Accept: "application/json",
    Body: new TextEncoder().encode(JSON.stringify(payload)),
  });
  const response = await withRetry(() => client.send(command), {
    label: "sagemaker.invokeEndpoint",
  });
  const body = JSON.parse(new TextDecoder().decode(response.Body));
  return body as TransformResult;
}
