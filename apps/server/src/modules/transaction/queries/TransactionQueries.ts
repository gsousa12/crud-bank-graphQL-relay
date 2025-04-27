import { GraphQLNonNull, GraphQLString } from "graphql";
import { TransactionType } from "../TransactionType";
import { TransactionLoader } from "../TransactionLoader";

export const transactionQueries = {
  transactionById: {
    type: TransactionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_root, args, context) => {
      return TransactionLoader.load(context, args.id);
    },
    description: "Fetch a transaction by UUID",
  },
};
