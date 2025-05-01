import { z } from "zod";
import { GraphQLError } from "graphql";
import { CreateTransactionType } from "../mutations/CreateTransactionMutation";

/* Regex que valida se a chave de transferencia é válida (Uuid do Crypto) */
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const transactionSchema = z
  .object({
    senderAccountId: z
      .string()
      .regex(uuidRegex, "SenderAccountId must be a valid UUID"),
    receiverAccountId: z
      .string()
      .regex(uuidRegex, "ReceiverAccountId must be a valid UUID"),
    amount: z
      .number()
      .int("Amount must be an integer")
      .positive("Amount must be greater than zero"),
  })
  .refine((data) => data.senderAccountId !== data.receiverAccountId, {
    message: "Sender and receiver accounts must be different",
    path: ["receiverAccountId"],
  });

export function validateTransactionInput(input: CreateTransactionType) {
  try {
    transactionSchema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new GraphQLError(error.errors.map((e) => e.message).join("; "));
    }
    throw error;
  }
}
