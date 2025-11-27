import { z } from 'zod';

export const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: "Пароль має містити мінімум 8 символів" })
        .max(32, { message: "Пароль має містити максимум 32 символи" }),
    confirmPassword: z.string()
        .min(8, { message: "Пароль має містити мінімум 8 символів" }), 
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;