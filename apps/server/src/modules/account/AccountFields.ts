import { AccountType } from "./AccountType";
import { AccountLoader } from "./AccountLoader";

export const AccountField = (key: string) => ({
  [key]: {
    type: AccountType,
    resolve: async (obj: Record<string, unknown>, _, context) =>
      AccountLoader.load(context, obj.account as string),
  },
});
