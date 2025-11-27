import { ESortOrder } from "@/shared";
import z from "zod";

const validSortFields: string[] = ['title', 'releaseDate', 'price'];

const validSortOrders = Object.values(ESortOrder);

export const getCatalogGamesRequestSchema = z.object({
    page: z.number({
        message: "Поле 'page' має бути числом."
    })
    .min(1, { message: "Номер сторінки має бути не менше 1." }),

    limit: z.number({
        message: "Поле 'limit' має бути числом."
    })
    .min(1, { message: "Ліміт ігор на сторінку має бути не менше 1." }),

    searchQuery: z.string({
        message: "Поле пошуку має бути рядком."
    }).optional(),

    sort: z.string({
        message: "Поле сортування має бути рядком."
    }).optional().refine(
        (value) => {
            if (!value) return true;

            const parts = value.split(':');
            if (parts.length !== 2) return false;

            const [field, order] = parts;
            const isFieldValid = validSortFields.includes(field);
            const isOrderValid = validSortOrders.includes(order as ESortOrder);

            return isFieldValid && isOrderValid;
        },
        {
            message: `Невірний формат сортування. Очікується формат: '[поле]:[напрямок]'. Дозволені поля: ${validSortFields.join(', ')}. Дозволені напрямки: ${validSortOrders.join(' або ')}.`,
        }
    ),

    genres: z.array(z.string({
        message: "Елементи жанрів мають бути рядками."
    }), {
        message: "Поле жанрів має бути масивом рядків."
    }).optional(),

    keywords: z.array(z.string({
        message: "Елементи атрибутів мають бути рядками."
    }), {
        message: "Поле атрибутів має бути масивом рядків."
    }).optional(),
});

export type TGetCatalogGamesRequest = z.infer<typeof getCatalogGamesRequestSchema>;