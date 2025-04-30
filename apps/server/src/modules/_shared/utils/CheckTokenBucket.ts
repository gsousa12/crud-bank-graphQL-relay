import { consumeToken } from "../helpers/TokenBucketHelper";
import { formatSecondsToMinutesAndSeconds } from "./Convert";

export async function checkTokenBucket(userId: string): Promise<void> {
  const checkTokenResult = await consumeToken(userId);

  if (!checkTokenResult.allowed) {
    const timeStr = formatSecondsToMinutesAndSeconds(
      checkTokenResult.retryAfterSeconds ?? 0
    );
    throw new Error(
      `Transaction limit reached. Please try again in ${timeStr}.`
    );
  }
}
