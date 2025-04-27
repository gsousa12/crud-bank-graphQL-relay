import { User } from "../UserModel";

import { PasswordAdapter } from "../../_shared/adapters/PasswordAdapter";
import { validateUserInput } from "../validators/UserInputValidator";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { Account } from "../../account/AccountModel";

/* Account terá um balance inicial de 100 reais*/
const INITIAL_BALANCE = 100_00;

export async function createUserService(input: CreateUserDTO) {
  validateUserInput(input);

  const emailExists = await User.findOne({ email: input.email });
  if (emailExists) throw new Error("Email already registered.");

  const taxIdExists = await User.findOne({ taxId: input.taxId });
  if (taxIdExists) throw new Error("TaxId already registered.");

  const hashedPassword = await PasswordAdapter.hash(input.password);

  const user = await new User({
    fullName: input.fullName,
    email: input.email,
    taxId: input.taxId,
    password: hashedPassword,
  }).save();

  /* Criação do modulo de conta */

  await new Account({
    userId: user._id,
    balance: INITIAL_BALANCE,
  }).save();

  return user;
}
