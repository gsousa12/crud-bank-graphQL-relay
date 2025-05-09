import { GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { createTransactionService } from "../service/CreateTransactionService.ts";
import { transactionField } from "../TransactionFields.ts";
import { Context } from "koa";
import { getAuthorization } from "../../_shared/utils/GetAuthorization.ts";

export type CreateTransactionType = {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  idempotencyKey: string;
};

const mutation = mutationWithClientMutationId({
  name: "CreateTransaction",
  inputFields: {
    senderAccountId: { type: new GraphQLNonNull(GraphQLString) },
    receiverAccountId: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    idempotencyKey: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (
    input: CreateTransactionType,
    context: Context
  ) => {
    getAuthorization(context);
    const transaction = await createTransactionService(input, context.user);
    return { transaction: transaction.id };
  },
  outputFields: {
    ...transactionField("transaction"),
  },
});

export const CreateTransactionMutation = {
  ...mutation,
};
