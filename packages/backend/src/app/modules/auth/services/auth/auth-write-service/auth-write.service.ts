import { Injectable } from '@nestjs/common';
import { JwtTokenPayloadDto } from '../../../dto/request/jwt-token/jwt-token-payload.dto';
import { JwtTokenResponseDto, UserCreateDto, UserResponseDto } from '../../../dto';
import { JwtTokenService } from '../../jwt-token/jwt-token.service';
import { UserWriteService } from '../../user/user-write-service/user-write.service';

@Injectable()
export class AuthWriteService {
    constructor(
        private readonly userWriteService: UserWriteService,
        private readonly jwtTokenService: JwtTokenService,
    ) {}

    async login(data: UserResponseDto): Promise<JwtTokenResponseDto> {
        const jwtTokenPayload: JwtTokenPayloadDto = {
            checksum: data.checksum,
            username: data.username,
            email: data.email,
        };

        // TODO: move to env variable or const
        const accessToken = await this.jwtTokenService.generateToken(
            jwtTokenPayload,
            '1h'
        );

        console.log('accessToken', accessToken);

        const jwtTokenResponse = new JwtTokenResponseDto(accessToken);

        return jwtTokenResponse;
    }

    async register(data: UserCreateDto): Promise<UserResponseDto> {
        return this.userWriteService.create(data);
    }
}