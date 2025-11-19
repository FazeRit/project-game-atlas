import { EnvEnum } from '../../../config/env/enums/env.enum';
import { EnvService } from '../../../config/env/services/env.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtTokenPayloadDto } from '../dto/request/jwt-token/jwt-token-payload.dto';
import { PassportStrategy } from '@nestjs/passport';

// TODO: think about refresh token implementation
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly envService: EnvService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			algorithms: ['RS256',],
			secretOrKey: envService.get(EnvEnum.JWT_PUBLIC_KEY)
		});
    }

	async validate(payload: JwtTokenPayloadDto): Promise<JwtTokenPayloadDto> {
		return payload;
	}
}