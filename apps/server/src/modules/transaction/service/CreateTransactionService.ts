import {
  getTransactionByIdempotencyKey,
  setTransactionIdempotencyKey,
} from "../../_shared/helpers/idempotencyHelper";
import { Account } from "../../account/AccountModel";
import { Transaction, TransactionStatus } from "../TransactionModel";
import { CreateTransactionDTO } from "../dtos/CreateTransactionDTO";
import { validateTransactionInput } from "../validator/TransactionValidator";

export async function createTransactionService(input: CreateTransactionDTO) {
  validateTransactionInput(input);

  const cachedTransactionResult = await getTransactionByIdempotencyKey(
    input.idempotencyKey
  );
  if (
    cachedTransactionResult &&
    cachedTransactionResult.amount === input.amount
  ) {
    return cachedTransactionResult;
  }

  const sender = await Account.findOne({ id: input.senderAccountId });
  if (!sender) throw new Error("Sender account not found.");

  const receiver = await Account.findOne({ id: input.receiverAccountId });
  if (!receiver) throw new Error("Receiver account not found.");

  if (sender.balance < input.amount) {
    await new Transaction({
      amount: input.amount,
      status: TransactionStatus.FAILED,
      reason: "Insufficient balance to perform a transaction.",
      senderAccountId: input.senderAccountId,
      receiverAccountId: input.receiverAccountId,
      idempotencyKey: input.idempotencyKey,
    }).save();
    throw new Error("Insufficient balance to perform a transaction.");
  }

  sender.balance -= input.amount;
  receiver.balance += input.amount;
  await sender.save();
  await receiver.save();

  const transaction = await new Transaction({
    amount: input.amount,
    status: TransactionStatus.SUCCESS,
    reason: null,
    senderAccountId: input.senderAccountId,
    receiverAccountId: input.receiverAccountId,
    idempotencyKey: input.idempotencyKey,
  }).save();

  await setTransactionIdempotencyKey(input.idempotencyKey, transaction);

  return transaction;
}
