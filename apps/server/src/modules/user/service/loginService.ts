import { JwtAdapter, JwtPayload } from "../../_shared/adapters/JwtAdapter";
import { PasswordAdapter } from "../../_shared/adapters/PasswordAdapter";
import { LoginDTO } from "../dtos/LoginDTO";
import { IUser, User } from "../UserModel";
import { validateLoginInput } from "../validators/loginInputValidator";
import { GraphQLError } from "graphql";

export type LoginResult = {
  token: string;
  user: IUser;
};

export async function loginService({
  email,
  password,
}: LoginDTO): Promise<LoginResult> {
  validateLoginInput({ email, password });
  const user = await User.findOne({ email });
  if (!user) throw new GraphQLError("Invalid credentials.");

  const isValid = await PasswordAdapter.compare(password, user.password);
  if (!isValid) throw new GraphQLError("Invalid credentials.");

  const payload: JwtPayload = { userId: user._id.toString() };
  const token = JwtAdapter.sign(payload);

  return { token, user };
}
