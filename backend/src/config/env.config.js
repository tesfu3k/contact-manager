import { defineEnv } from "nviron";

export const env = defineEnv({
  PORT: { required: true, default: 5052 },
  MONGO_URL: { required: true },
});
