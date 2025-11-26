import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { User } from '@prisma/client';

export abstract class IUserReadRepository extends IReadRepository<User> {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract getTasteProfile(userId: string): Promise<Record<string, number>>;
}