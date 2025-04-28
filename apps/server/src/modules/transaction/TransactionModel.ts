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
  senderAccountId: string;
  receiverAccountId: string;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export const Transaction: Model<ITransaction> = mongoose.model(
  "Transaction",
  TransactionSchema
);
