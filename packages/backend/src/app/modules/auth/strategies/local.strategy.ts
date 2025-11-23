import { AuthReadService } from '../services/auth/auth-read-service/auth-read.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserResponseDto } from '../dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authUserReadService: AuthReadService
	) {
		super({
			usernameField: 'email'
		})
	}

	async validate(email: string, password: string): Promise<UserResponseDto> {
		const user = await this.authUserReadService.validateUser(
			email,
			password
		);

		if(!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}