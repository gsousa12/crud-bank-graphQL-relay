import { config } from "../../../config";
import { RedisAdapter } from "../adapters/RedisAdapter";

const IDEMPOTENCY_KEY_PREFIX = "Idempotency_Key[Transaction]";
const IDEMPOTENCY_TTL_SECONDS = config.IDEMPOTENCY_TTL_SECONDS;

const getIdempotencyKey = (idempotencyKey: string) =>
  `${IDEMPOTENCY_KEY_PREFIX}:${idempotencyKey}`;

export async function getTransactionByIdempotencyKey<T = any>(
  idempotencyKey: string
): Promise<T | null> {
  return RedisAdapter.get<T>(getIdempotencyKey(idempotencyKey));
}

export async function setTransactionIdempotencyKey<T = any>(
  idempotencyKey: string,
  value: T
): Promise<void> {
  await RedisAdapter.set(
    getIdempotencyKey(idempotencyKey),
    value,
    IDEMPOTENCY_TTL_SECONDS
  );
}
