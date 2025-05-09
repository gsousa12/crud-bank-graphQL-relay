import { Context } from "koa";

export const getAuthorization = (context: Context): void => {
  if (!context.user) {
    throw new Error("Unauthorized: Send a valid jwt token in the request.");
  }
};
