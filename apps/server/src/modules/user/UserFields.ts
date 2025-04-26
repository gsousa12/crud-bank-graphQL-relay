import { UserType } from "./UserType";
import { UserLoader } from "./UserLoader";

export const userField = (key: string) => ({
  [key]: {
    type: UserType,
    resolve: async (obj: Record<string, unknown>, _, context) =>
      UserLoader.load(context, obj.user as string),
  },
});
