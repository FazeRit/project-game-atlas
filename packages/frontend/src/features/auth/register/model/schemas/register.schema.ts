import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().trim().email('Invalid email address'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters').max(32, 'Password must be at most 32 characters'),
});

export type TRegisterSchema = z.infer<typeof registerSchema>