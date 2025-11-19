import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OtpCreateDto {
	@Expose()
	userId!: string;

	@Expose()
	code!: string;

	@Expose()
	expiresAt!: Date;
}

