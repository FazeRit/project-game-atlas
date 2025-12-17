import { AuthWriteService } from '../../../services/auth/auth-write-service/auth-write.service';
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UseGuards
} from '@nestjs/common';
import { ForgotPasswordDto } from '../../../dto/request/auth/forgot-password.dto';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { UserCreateDto, UserResponseDto } from '../../../dto';
import { LocalAuthGuard } from '../../../guards/local.guard';
import { Public } from '../../../../../shared/decorators/public.decorator';
import { ResetPasswordDto } from '../../../dto/request/auth/reset-password.dto';
import { VerifyForgotPasswordCodeDto } from '../../../dto/request/auth/verify-forgot-password-code.dto';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';
import type { Response } from 'express';

@Controller('/auth')
export class AuthWriteController {
	constructor(
		private readonly authWriteService: AuthWriteService,
	) {}

@Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @GetUser() user: UserResponseDto
    ): Promise<ApiResponseDto<null>> {
        const tokenData = await this.authWriteService.login(user);

        res.cookie('access_token', tokenData.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        const response = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data: null,
            timestamp: new Date().toISOString(),
            success: true,
        });

        return response;
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    async register(
        @Body() user: UserCreateDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<ApiResponseDto<null>> {
        const tokenData = await this.authWriteService.register(user);

        res.cookie('access_token', tokenData.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        const response = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data: null,
            timestamp: new Date().toISOString(),
            success: true,
        });

        return response;
    }

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/forgot-password')
	async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
		await this.authWriteService.forgotPassword(forgotPasswordDto.email);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/verify-forgot-password')
	async verifyForgotPassword(@Body() verifyDto: VerifyForgotPasswordCodeDto): Promise<ApiResponseDto<boolean>> {
		const result =  await this.authWriteService.verifyForgotPassword(verifyDto.code);

		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data: result,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return response;
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/reset-password')
	async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
		await this.authWriteService.resetPassword(
			resetPasswordDto.code,
			resetPasswordDto.newPassword
		);
	}
}