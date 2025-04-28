import { Context } from "koa";

export const getAuthorization = (context: Context): void => {
  if (!context.user) {
    throw new Error("Unauthorized: You must be logged in.");
  }
};
