import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { createTransactionService } from "../service/CreateTransactionService";
import { transactionField } from "../TransactionFields.ts";

const mutation = mutationWithClientMutationId({
  name: "TransactionAdd",
  inputFields: {
    senderAccountId: { type: new GraphQLNonNull(GraphQLString) },
    receiverAccountId: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  mutateAndGetPayload: async (args) => {
    const transaction = await createTransactionService(args);
    return { transaction: transaction.id };
  },
  outputFields: {
    ...transactionField("transaction"),
  },
});

export const TransactionAddMutation = {
  ...mutation,
};
