import { EPersonalLibraryGameStatus, EPersonalLibraryGameRank } from '@/entities/personal-library-game/model/enums';
import { z } from 'zod';

export const personalLibraryGameStatusSchema = z.enum(EPersonalLibraryGameStatus);
export const personalLibraryGameRankSchema = z.enum(EPersonalLibraryGameRank);

export const updatePersonalLibraryGameSchema = z.object({
    gameId: z.string(),
    status: personalLibraryGameStatusSchema.optional(),
    note: z.string().max(255, "Примітка не може бути довшою за 255 символів.").optional().nullable(),
});

export type TUpdatePersonalLibraryGameSchema = z.infer<typeof updatePersonalLibraryGameSchema>;