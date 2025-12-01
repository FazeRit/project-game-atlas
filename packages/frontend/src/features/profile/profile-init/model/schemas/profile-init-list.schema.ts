import z from "zod";

export const profileInitListSchema = z.object({
    games: z.array(
        z.object({
            checksum: z.string(),
            coverUrl: z.string(),
            name: z.string(),
        })
    ).min(3).max(5),
});

export type TProfileInitListSchema = z.infer<typeof profileInitListSchema>;