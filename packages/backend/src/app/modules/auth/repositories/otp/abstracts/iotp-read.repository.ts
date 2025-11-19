import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { Otp } from '@prisma/client';

export abstract class IOtpReadRepository extends IReadRepository<Otp> {
	abstract findByCode(code: string): Promise<Otp | null>;
}

