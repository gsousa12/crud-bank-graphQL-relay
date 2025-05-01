import {
  getTransactionByIdempotencyKey,
  setTransactionIdempotencyKey,
} from "../../_shared/helpers/IdempotencyHelper";
import { checkTokenBucket } from "../../_shared/utils/CheckTokenBucket";
import { Account } from "../../account/AccountModel";
import { IUser } from "../../user/UserModel";
import { Transaction, TransactionStatus } from "../TransactionModel";
import { CreateTransactionDTO } from "../dtos/CreateTransactionDTO";
import { validateTransactionInput } from "../validator/TransactionValidator";
import { GraphQLError } from "graphql";

export async function createTransactionService(
  input: CreateTransactionDTO,
  user: IUser
) {
  validateTransactionInput(input);

  await checkTokenBucket(user._id.toString());

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
  if (!sender) throw new GraphQLError("Sender account not found.");

  const receiver = await Account.findOne({ id: input.receiverAccountId });
  if (!receiver) throw new GraphQLError("Receiver account not found.");

  if (sender.balance < input.amount) {
    await new Transaction({
      amount: input.amount,
      status: TransactionStatus.FAILED,
      reason: "Insufficient balance to perform a transaction.",
      senderAccountId: input.senderAccountId,
      receiverAccountId: input.receiverAccountId,
      idempotencyKey: input.idempotencyKey,
    }).save();
    throw new GraphQLError("Insufficient balance to perform a transaction.");
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
