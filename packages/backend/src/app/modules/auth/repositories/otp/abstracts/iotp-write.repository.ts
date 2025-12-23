import { OtpCreateDto, OtpUpdateDto } from "../../../dto";

export abstract class IOtpWriteRepository {
	abstract create(data: OtpCreateDto, ttl?: number): Promise<void>;

	abstract update(data: OtpUpdateDto, email: string): Promise<void>;

	abstract delete(email: string): Promise<void> 

	abstract createMany(data: Array<OtpCreateDto>): Promise<void>

	abstract deleteManyByEmail(email: string): Promise<void>;
}

