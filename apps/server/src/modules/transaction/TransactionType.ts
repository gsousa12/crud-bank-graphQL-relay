import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import { globalIdField } from "graphql-relay";

import { ITransaction } from "./TransactionModel";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { TransactionLoader } from "./TransactionLoader";

const TransactionType = new GraphQLObjectType<ITransaction>({
  name: "Transaction",
  description: "Represents a bank transaction",
  fields: () => ({
    id: globalIdField("Transaction"),
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (transaction) => transaction._id,
    },
    transactionId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.id,
      description: "Transaction UUID",
    },
    amount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (transaction) => transaction.amount,
      description: "Transaction amount in cents",
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.status,
      description: "Transaction status",
    },
    reason: {
      type: GraphQLString,
      resolve: (transaction) => transaction.reason,
      description: "Reason that explains why a transaction was rejected",
    },
    senderAccountId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.senderAccountId,
      description: "Sender account UUID",
    },
    receiverAccountId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.receiverAccountId,
      description: "Receiver account UUID",
    },
    idempotencyKey: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.idempotencyKey,
      description: "Idempotency key of a transaction",
    },
    createdAt: {
      type: GraphQLString,
      resolve: (transaction) => transaction.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (transaction) => transaction.updatedAt.toISOString(),
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(TransactionType, (context, id) =>
  TransactionLoader.load(context as any, id)
);

export { TransactionType };
