import { z } from "zod";
import { GraphQLError } from "graphql";
import { LoginRequestType } from "../mutations/UserLoginMutation";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function validateLoginInput(input: LoginRequestType) {
  try {
    loginSchema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new GraphQLError(error.errors.map((e) => e.message).join("; "));
    }
    throw error;
  }
}
