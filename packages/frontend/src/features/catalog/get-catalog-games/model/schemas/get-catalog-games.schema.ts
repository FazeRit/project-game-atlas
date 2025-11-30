import { ESortOrder } from "@/shared";
import z from "zod";
import { ECatalogGameSortField } from "../enums";

const allowedFields = Object.values(ECatalogGameSortField);
const allowedOrders = Object.values(ESortOrder);

const sortLiterals = allowedFields.flatMap(field => 
    allowedOrders.map(order => `${field}:${order}` as const)
);

const sortUnionSchema = z.union(
    [
        ...sortLiterals.map(literal => z.literal(literal)) 
    ] as [z.ZodLiteral<typeof sortLiterals[0]>, ...z.ZodLiteral<string>[]]
);

export const getCatalogGamesRequestSchema = z.object({
    page: z.number({
        message: "Поле 'page' має бути числом."
    }).min(1, { message: "Номер сторінки має бути не менше 1." }),

    limit: z.number({
        message: "Поле 'limit' має бути числом."
    }).min(1, { message: "Ліміт ігор на сторінку має бути не менше 1." }),

    searchQuery: z.string({
        message: "Поле пошуку має бути рядком."
    }).optional(),

    sort: sortUnionSchema.optional(),

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