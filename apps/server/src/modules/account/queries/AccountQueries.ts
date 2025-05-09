import { GraphQLNonNull, GraphQLString } from "graphql";
import { AccountType } from "../AccountType";
import { AccountLoader } from "../AccountLoader";

export const accountQueries = {
  accountById: {
    type: AccountType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_root, input, context) => {
      return AccountLoader.load(context, input.id);
    },
    description: "Fetch an account by UUID",
  },
};
