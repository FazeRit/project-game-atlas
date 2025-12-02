import { z } from 'zod';

export const getKeywordsRequestSchema = z.object({
    page: z.coerce.number({
        message: "Поле 'page' має бути числом.",
    })
        .int({ message: "Поле 'page' має бути цілим числом." })
        .min(1, { message: "Номер сторінки має бути не менше 1." })
        .default(1),

    limit: z.coerce.number({
        message: "Поле 'limit' має бути числом.",
    })
        .int({ message: "Поле 'limit' має бути цілим числом." })
        .min(1, { message: "Ліміт має бути не менше 1." })
        .max(100, { message: "Ліміт не може перевищувати 100." })
        .default(10)
});

export type GetKeywordsRequest = z.infer<typeof getKeywordsRequestSchema>;