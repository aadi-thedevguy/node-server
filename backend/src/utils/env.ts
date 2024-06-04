import { z } from "zod";

const ServeEnv = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, "Port must be a numeric string")
    .default("3000")
    .transform(Number),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
});
export const Env = ServeEnv.parse(process.env);
