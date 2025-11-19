import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { JwtTokenPayloadDto } from '../../../dto/request/jwt-token/jwt-token-payload.dto';
import { JwtTokenResponseDto, UserCreateDto, UserResponseDto } from '../../../dto';
import { JwtTokenService } from '../../jwt-token/jwt-token.service';
import { OtpService } from '../../otp/otp.service';
import { SmtpAuthService } from '../../../../smtp/services/smtp-auth-service/smtp-auth.service';
import { UserReadService } from '../../user/user-read-service/user-read.service';
import { UserWriteService } from '../../user/user-write-service/user-write.service';

@Injectable()
export class AuthWriteService {
    private readonly logger = new Logger(AuthWriteService.name);

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
            username: data.username,
            email: data.email,
        };

        // TODO: move to env variable or const
        const accessToken = await this.jwtTokenService.generateToken(
            jwtTokenPayload,
            '1h'
        );

        const jwtTokenResponse = new JwtTokenResponseDto(accessToken);

        return jwtTokenResponse;
    }

    async register(data: UserCreateDto): Promise<UserResponseDto> {
        return this.userWriteService.create(data);
    }

    async forgotPassword(email: string): Promise<void> {
        this.logger.log(`Forgot password request received for email: ${email}`);

        const user = await this.userReadService.findByEmailWithPassword(email);
        if (!user) {
            this.logger.warn(`Forgot password request for non-existent email: ${email}`);
            return;
        }

        this.logger.log(`User found for forgot password: ${email}, userId: ${user.checksum}`);

        const otp = await this.otpService.createOtp(user.checksum);
        this.logger.log(`OTP created for forgot password: ${email}, otpId: ${otp.checksum}`);

        await this.smtpAuthService.sendForgotPasswordEmail(email, otp.code, user.username);
        this.logger.log(`Forgot password email sent successfully: ${email}`);
    }

    async verifyForgotPassword(code: string): Promise<boolean> {
        await this.otpService.validateOtp(code);
        return true;
    }

	async resetPassword(code: string, newPassword: string): Promise<void> {
        const otp = await this.otpService.validateOtp(code);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.userWriteService.update(otp.userId, {
            password: hashedPassword,
        });

        await this.otpService.deleteOtp(otp.checksum);
    }
}