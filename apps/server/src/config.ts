import path from "path";

import dotenvSafe from "dotenv-safe";

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root(".env"),
  sample: root(".env.example"),
});

const ENV = process.env;

const config = {
  PORT: ENV.PORT ?? 4000,
  MONGO_URI: ENV.MONGO_URI ?? "",
  SALT_ROUNDS: Number(ENV.SALT_ROUNDS),
  JWT_SECRET: ENV.JWT_SECRET,
  JWT_EXPIRES_IN: ENV.JWT_EXPIRES_IN,
};

export { config };
