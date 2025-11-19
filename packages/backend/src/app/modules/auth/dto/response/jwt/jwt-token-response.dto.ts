import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class JwtTokenResponseDto {
	@Expose()
	accessToken: string;

	constructor(accessToken: string) {
		this.accessToken = accessToken;
	}
}