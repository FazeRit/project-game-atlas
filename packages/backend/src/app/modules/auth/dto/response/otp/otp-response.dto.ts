import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OtpResponseDto {
	@Expose()
	email: string;

	@Expose()
	code: string;

	constructor(
		email: string,
		code: string,
		expiresAt: Date,
	) {
		this.email = email;
		this.code = code;
	}
}

