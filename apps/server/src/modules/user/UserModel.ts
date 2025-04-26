import type { Document, Model } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      description: "Full name of the user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      description: "User email (unique)",
    },
    taxId: {
      type: String,
      required: true,
      unique: true,
      description: "CPF/CNPJ (unique)",
    },
    password: {
      type: String,
      required: true,
      description: "Hashed password",
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export type IUser = {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  taxId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export const User: Model<IUser> = mongoose.model("User", UserSchema);
