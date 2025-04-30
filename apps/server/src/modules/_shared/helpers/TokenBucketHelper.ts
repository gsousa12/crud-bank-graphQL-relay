import { DateTime } from "luxon";
import { RedisAdapter } from "../adapters/RedisAdapter";
import { config } from "../../../config";

const TOKEN_BUCKET_KEY_PREFIX = "Token_Bucket";
const MAX_TOKENS = config.MAX_TOKENS;
const REFILL_INTERVAL_MINUTES = config.REFILL_INTERVAL_MINUTES;

type TokenBucket = {
  tokens: number;
  last_updated: string;
};

type ConsumeTokenResponse = {
  allowed: boolean;
  tokens: number;
  retryAfterSeconds?: number;
};

function getTokenBucketKey(userId: string) {
  return `${TOKEN_BUCKET_KEY_PREFIX}:${userId}`;
}

export async function getTokenBucket(
  userId: string
): Promise<TokenBucket | null> {
  return RedisAdapter.get<TokenBucket>(getTokenBucketKey(userId));
}

export async function setTokenBucket(userId: string, bucket: TokenBucket) {
  await RedisAdapter.set(getTokenBucketKey(userId), bucket);
}

export async function consumeToken(
  userId: string
): Promise<ConsumeTokenResponse> {
  const now = DateTime.utc();
  let bucket = await getTokenBucket(userId);

  if (!bucket) {
    bucket = {
      tokens: MAX_TOKENS <= 1 ? 0 : MAX_TOKENS - 1,
      last_updated: now.toISO()!,
    };
    console.log(bucket.tokens);
    await setTokenBucket(userId, bucket);
    return { allowed: true, tokens: bucket.tokens };
  }

  const lastUpdated = DateTime.fromISO(bucket.last_updated);
  const minutesSinceLast = now.diff(lastUpdated, "minutes").minutes;

  if (minutesSinceLast >= REFILL_INTERVAL_MINUTES) {
    (bucket.tokens = MAX_TOKENS <= 1 ? 0 : MAX_TOKENS - 1),
      (bucket.last_updated = now.toISO()!);
    await setTokenBucket(userId, bucket);
    return { allowed: true, tokens: bucket.tokens };
  }

  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    bucket.last_updated = now.toISO()!;
    await setTokenBucket(userId, bucket);
    return { allowed: true, tokens: bucket.tokens };
  }

  const retryAfterSeconds = Math.ceil(
    REFILL_INTERVAL_MINUTES * 60 - now.diff(lastUpdated, "seconds").seconds
  );
  return {
    allowed: false,
    tokens: 0,
    retryAfterSeconds,
  };
}
