export type CreateTransactionDTO = {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  idempotencyKey: string;
};
