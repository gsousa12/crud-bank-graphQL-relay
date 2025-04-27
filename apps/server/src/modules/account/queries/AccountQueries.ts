import { GraphQLNonNull, GraphQLString } from "graphql";
import { AccountType } from "../AccountType";
import { AccountLoader } from "../AccountLoader";

export const AccountQueries = {
  accountById: {
    type: AccountType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_root, args, context) => {
      return AccountLoader.load(context, args.id);
    },
    description: "Fetch an account by UUID",
  },
};
