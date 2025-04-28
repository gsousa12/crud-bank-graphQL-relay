import type { Document, Model } from "mongoose";
import mongoose from "mongoose";
import { UuidAdapter } from "../_shared/adapters/UuidAdapter";

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

const TransactionSchema = new mongoose.Schema<ITransaction>(
  {
    id: {
      type: String,
      default: () => UuidAdapter.generate(),
      unique: true,
      index: true,
      description: "Transaction UUID",
    },
    amount: {
      type: Number,
      required: true,
      description: "Transaction amount in cents",
    },
    status: {
      type: String,
      required: true,
      description: "Transaction status",
    },
    reason: {
      type: String || null,
      description: "Reason that explains why a transaction was rejected",
    },
    senderAccountId: {
      type: String,
      required: true,
      description: "Sender account UUID",
    },
    receiverAccountId: {
      type: String,
      required: true,
      description: "Receiver account UUID",
    },
    idempotencyKey: {
      type: String,
      required: true,
      description: "Idempotency key of a transaction",
    },
  },
  {
    collection: "Transaction",
    timestamps: true,
  }
);

export type ITransaction = {
  _id: mongoose.Types.ObjectId;
  id: string;
  amount: number;
  status: string;
  reason: string | null;
  senderAccountId: string;
  receiverAccountId: string;
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export const Transaction: Model<ITransaction> = mongoose.model(
  "Transaction",
  TransactionSchema
);
