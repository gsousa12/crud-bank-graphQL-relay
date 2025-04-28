import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { createTransactionService } from "../service/CreateTransactionService.ts";
import { transactionField } from "../TransactionFields.ts";
import { CreateTransactionDTO } from "../dtos/CreateTransactionDTO.ts";
import { Context } from "koa";

const mutation = mutationWithClientMutationId({
  name: "CreateTransaction",
  inputFields: {
    senderAccountId: { type: new GraphQLNonNull(GraphQLString) },
    receiverAccountId: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  mutateAndGetPayload: async (
    input: CreateTransactionDTO,
    context: Context
  ) => {
    if (!context.user) {
      throw new Error("Unauthorized: You must be logged in.");
    }
    const transaction = await createTransactionService(input);
    return { transaction: transaction.id };
  },
  outputFields: {
    ...transactionField("transaction"),
  },
});

export const CreateTransactionMutation = {
  ...mutation,
};
