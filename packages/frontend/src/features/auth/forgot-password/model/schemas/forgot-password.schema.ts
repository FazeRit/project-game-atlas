import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: "Це поле обов'язкове" })
        .email({ message: "Введіть коректну електронну пошту" }),
})

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;