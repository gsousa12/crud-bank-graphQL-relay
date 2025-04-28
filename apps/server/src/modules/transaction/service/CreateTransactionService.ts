import { Account } from "../../account/AccountModel";
import {
  ITransaction,
  Transaction,
  TransactionStatus,
} from "../TransactionModel";
import { CreateTransactionDTO } from "../dtos/CreateTransactionDTO";
import { validateTransactionInput } from "../validator/TransactionValidator";

export async function createTransactionService(
  input: CreateTransactionDTO
): Promise<ITransaction> {
  validateTransactionInput(input);

  /* 
    O Service não está implementando atomicidade na transaction.
  */

  const sender = await Account.findOne({ id: input.senderAccountId });
  if (!sender) throw new Error("Sender account not found.");

  const receiver = await Account.findOne({ id: input.receiverAccountId });
  if (!receiver) throw new Error("Receiver account not found.");

  let status = TransactionStatus.FAILED;
  if (sender.balance >= input.amount) {
    sender.balance -= input.amount;
    receiver.balance += input.amount;
    await sender.save();
    await receiver.save();
    status = TransactionStatus.SUCCESS;
  }

  const transaction = await new Transaction({
    amount: input.amount,
    status,
    senderAccountId: input.senderAccountId,
    receiverAccountId: input.receiverAccountId,
  }).save();

  return transaction;
}
