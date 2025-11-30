import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string()
        .trim()
        .min(1, { message: "Це поле обов'язкове" })
        .email({ message: "Введіть коректну електронну пошту" }),
    password: z.string()
        .trim()
        .min(8, { message: "Пароль має містити мінімум 8 символів" })
        .max(32, { message: "Пароль має містити максимум 32 символи" }),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;