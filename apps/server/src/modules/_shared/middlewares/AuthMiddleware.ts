import { Context, Next } from "koa";
import { JwtAdapter, JwtPayload } from "../adapters/JwtAdapter";
import { User } from "../../user/UserModel";

export async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.request.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    try {
      const payload = JwtAdapter.verify<JwtPayload>(token);
      ctx.state.user = await User.findById(payload.userId);
    } catch (err) {
      ctx.state.user = null;
    }
  } else {
    ctx.state.user = null;
  }
  await next();
}
