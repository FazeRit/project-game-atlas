import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
    private readonly privateKey: string;

    private readonly publicKey: string;

    constructor(
        private readonly envService: EnvService,
        private readonly jwtService: JwtService,
    ) {
        this.privateKey = this.envService.get(EnvEnum.JWT_PRIVATE_KEY);
        this.publicKey = this.envService.get(EnvEnum.JWT_PUBLIC_KEY);
    }

    async generateToken<JwtTokenPayload extends object>(
        payload: JwtTokenPayload,
        expiresIn: JwtSignOptions['expiresIn'],
        options?: JwtSignOptions,
    ): Promise<string> {
        const finalOptions: JwtSignOptions = {
            expiresIn,
            privateKey: this.privateKey,
            ...options,
        };

        return this.jwtService.signAsync(payload, finalOptions);
    }

    async verifyToken<JwtTokenPayload extends object>(
        token: string,
    ): Promise<JwtTokenPayload> {
        return this.jwtService.verifyAsync<JwtTokenPayload>(token, {
            publicKey: this.publicKey,
        });
    }
}