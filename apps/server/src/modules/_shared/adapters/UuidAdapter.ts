import { randomUUID } from "crypto";

export const UuidAdapter = {
  generate(): string {
    return randomUUID();
  },
};
