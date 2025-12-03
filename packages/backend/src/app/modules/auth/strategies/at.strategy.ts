import { EnvEnum } from '../../../config/env/enums/env.enum';
import { EnvService } from '../../../config/env/services/env.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtTokenPayloadDto } from '../dto/request/jwt-token/jwt-token-payload.dto';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express'

// TODO: think about refresh token implementation
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'at') {
    constructor(
        private readonly envService: EnvService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
				AtStrategy.extractJWTFromCookie
			]),
			ignoreExpiration: false,
			algorithms: ['RS256',],
			secretOrKey: envService.get(EnvEnum.JWT_PUBLIC_KEY)
		});
    }

	private static extractJWTFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies['access_token']) {
            return req.cookies['access_token'];
        }
        return null;
    }

	async validate(payload: JwtTokenPayloadDto): Promise<JwtTokenPayloadDto> {
		return payload;
	}
}