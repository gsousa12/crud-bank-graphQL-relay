import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import { globalIdField } from "graphql-relay";

import { IAccount } from "./AccountModel";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { AccountLoader } from "./AccountLoader";

const AccountType = new GraphQLObjectType<IAccount>({
  name: "Account",
  description: "Represents a bank account",
  fields: () => ({
    id: globalIdField("Account"),
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (account) => account._id,
    },
    accountId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.id,
      description: "Id that will be used in transaction tracking",
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (account) => account.userId,
      description: "Reference to the user who owns the account",
    },
    balance: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (account) => account.balance,
      description: "Balance in cents",
    },
    createdAt: {
      type: GraphQLString,
      resolve: (account) => account.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (account) => account.updatedAt.toISOString(),
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(AccountType, (context, id) =>
  AccountLoader.load(context as any, id)
);

export { AccountType };
