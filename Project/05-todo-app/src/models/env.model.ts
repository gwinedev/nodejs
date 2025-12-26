import {z} from "zod"

export const EnvSchema = z.object({
    PORT: z.coerce.number().int().positive(),
    NODE_ENV: z.enum(["development", "test", "production"])
})

export type Env = z.infer<typeof EnvSchema>