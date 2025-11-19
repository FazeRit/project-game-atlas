import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';
import { Otp } from '@prisma/client';
import { OtpCreateDto, OtpUpdateDto } from '../../../dto';

export abstract class IOtpWriteRepository extends IWriteRepository<Otp, OtpCreateDto, OtpUpdateDto> {
	abstract deleteManyByUserId(userId: string): Promise<void>;
}

