import dotenv from "dotenv";
import { EnvSchema } from "../models/env.model";

dotenv.config();

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment configuration: ");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
