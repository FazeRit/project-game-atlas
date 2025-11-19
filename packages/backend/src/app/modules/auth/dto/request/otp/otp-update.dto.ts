import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OtpUpdateDto {
	@Expose()
	code?: string;

	@Expose()
	expiresAt?: Date;
}

