import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OtpResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	code: string;

	@Expose()
	expiresAt: Date;

	@Expose()
	createdAt: Date;

	constructor(
		checksum: string,
		code: string,
		expiresAt: Date,
		createdAt: Date
	) {
		this.checksum = checksum;
		this.code = code;
		this.expiresAt = expiresAt;
		this.createdAt = createdAt;
	}
}

