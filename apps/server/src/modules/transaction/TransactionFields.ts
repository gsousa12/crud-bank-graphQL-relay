import { TransactionType } from "./TransactionType";
import { TransactionLoader } from "./TransactionLoader";

export const transactionField = (key: string) => ({
  [key]: {
    type: TransactionType,
    resolve: async (obj: Record<string, unknown>, _, context) =>
      TransactionLoader.load(context, obj.transaction as string),
  },
});
