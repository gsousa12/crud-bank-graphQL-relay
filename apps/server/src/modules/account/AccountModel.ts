import type { Document, Model } from "mongoose";
import mongoose from "mongoose";
import { UuidAdapter } from "../_shared/adapters/UuidAdapter";

const AccountSchema = new mongoose.Schema<IAccount>(
  {
    id: {
      type: String,
      default: () => UuidAdapter.generate(),
      unique: true,
      index: true,
      description: "Id that will be used in transaction tracking",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      description: "Reference to the user who owns the account",
    },
    balance: {
      type: Number,
      required: true,
      description: "Balance in cents",
    },
  },
  {
    collection: "Account",
    timestamps: true,
  }
);

export type IAccount = {
  _id: mongoose.Types.ObjectId;
  id: string;
  userId: mongoose.Types.ObjectId;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export const Account: Model<IAccount> = mongoose.model(
  "Account",
  AccountSchema
);
