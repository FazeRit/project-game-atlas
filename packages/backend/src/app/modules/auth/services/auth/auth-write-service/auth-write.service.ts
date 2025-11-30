import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtTokenPayloadDto } from '../../../dto/request/jwt-token/jwt-token-payload.dto';
import { JwtTokenResponseDto, UserCreateDto, UserResponseDto } from '../../../dto';
import { JwtTokenService } from '../../jwt-token/jwt-token.service';
import { OtpService } from '../../otp/otp.service';
import { SmtpAuthService } from '../../../../smtp/services/smtp-auth-service/smtp-auth.service';
import { UserReadService } from '../../user/user-read-service/user-read.service';
import { UserWriteService } from '../../user/user-write-service/user-write.service';

@Injectable()
export class AuthWriteService {
    constructor(
        private readonly userWriteService: UserWriteService,
        private readonly userReadService: UserReadService,
        private readonly jwtTokenService: JwtTokenService,
        private readonly otpService: OtpService,
        private readonly smtpAuthService: SmtpAuthService,
    ) {}

    async login(data: UserResponseDto): Promise<JwtTokenResponseDto> {
        const jwtTokenPayload: JwtTokenPayloadDto = {
            checksum: data.checksum,
            email: data.email,
        };

        // TODO: move to env variable or const
        const accessToken = await this.jwtTokenService.generateToken(
            jwtTokenPayload,
            '1d'
        );

        const jwtTokenResponse = new JwtTokenResponseDto(accessToken);

        return jwtTokenResponse;
    }

    async register(data: UserCreateDto): Promise<JwtTokenResponseDto> {
        const user = await this.userWriteService.create(data);

        if(!user) {
            throw new BadRequestException('Failed to create user');
        }

        const jwtTokenPayload: JwtTokenPayloadDto = {
            checksum: user.checksum,
            email: user.email,
        };

        // TODO: move to env variable or const
        const accessToken = await this.jwtTokenService.generateToken(
            jwtTokenPayload,
            '1d'
        );

        const jwtTokenResponse = new JwtTokenResponseDto(accessToken);

        return jwtTokenResponse;
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.userReadService.findByEmail(
			email
		);

        if (!user) {
            throw new NotFoundException('Користувача не знайдено');
        }

        const otp = await this.otpService.createOtp(user.checksum);

        await this.smtpAuthService.sendForgotPasswordEmail(email, otp.code);
    }

    async verifyForgotPassword(code: string): Promise<boolean> {
        await this.otpService.validateOtp(code);
        return true;
    }

	async resetPassword(code: string, newPassword: string): Promise<void> {
        const otp = await this.otpService.validateOtp(code);

        await this.userWriteService.update(otp.userId, {
            password: newPassword,
        });

        await this.otpService.deleteOtp(otp.checksum);
    }
}