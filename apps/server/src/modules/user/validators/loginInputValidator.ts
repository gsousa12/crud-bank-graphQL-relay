import { z } from "zod";
import { LoginDTO } from "../dtos/LoginDTO";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function validateLoginInput(input: LoginDTO) {
  try {
    loginSchema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((e) => e.message).join("; "));
    }
    throw error;
  }
}
