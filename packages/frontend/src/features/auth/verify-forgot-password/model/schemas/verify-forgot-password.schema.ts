import { z } from 'zod';

export const verifyForgotPasswordSchema = z.object({
    code: z.string().min(6, {
        message: "Код має містити 6 цифр.",
    }),
})

export type TVerifyForgotPasswordSchema = z.infer<typeof verifyForgotPasswordSchema>