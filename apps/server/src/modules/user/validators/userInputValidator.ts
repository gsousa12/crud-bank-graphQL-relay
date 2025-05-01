import { z } from "zod";
import { GraphQLError } from "graphql";
import { CreateUserType } from "../mutations/CreateUserMutation";

const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  taxId: z
    .string()
    .regex(
      /^(\d{11}|\d{14})$/,
      "taxId must be a valid CPF (11 digits) or CNPJ (14 digits)"
    ),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export function validateUserInput(input: CreateUserType) {
  try {
    userSchema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new GraphQLError(error.errors.map((e) => e.message).join("; "));
    }
    throw error;
  }
}
