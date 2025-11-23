import { AuthWriteService } from '../../../services/auth/auth-write-service/auth-write.service';
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Logger,
	Post,
	UseGuards
} from '@nestjs/common';
import { ForgotPasswordDto } from '../../../dto/request/auth/forgot-password.dto';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { JwtTokenResponseDto, UserCreateDto, UserResponseDto } from '../../../dto';
import { LocalAuthGuard } from '../../../guards/local.guard';
import { Public } from '../../../../../shared/decorators/public.decorator';
import { ResetPasswordDto } from '../../../dto/request/auth/reset-password.dto';
import { VerifyForgotPasswordCodeDto } from '../../../dto/request/auth/verify-forgot-password-code.dto';

@Controller('/auth')
export class AuthWriteController {
	private readonly logger = new Logger(AuthWriteController.name);

	constructor(
		private readonly authWriteService: AuthWriteService,
	) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('/login')
	async login(@GetUser() user: UserResponseDto): Promise<JwtTokenResponseDto> {
		return await this.authWriteService.login(user);
	}

	@Public()
	@HttpCode(HttpStatus.CREATED)
	@Post('/register')
	async register(@Body() user: UserCreateDto): Promise<void> {
		await this.authWriteService.register(user);
		// Personal library should be created separately via POST /personal-libraries endpoint
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/forgot-password')
	async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
		this.logger.log(`POST /auth/forgot-password - Request received for email: ${forgotPasswordDto.email}`);
		await this.authWriteService.forgotPassword(forgotPasswordDto.email);
		this.logger.log(`POST /auth/forgot-password - Request processed for email: ${forgotPasswordDto.email}`);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/verify-forgot-password')
	async verifyForgotPassword(@Body() verifyDto: VerifyForgotPasswordCodeDto): Promise<boolean> {
		return await this.authWriteService.verifyForgotPassword(verifyDto.code);
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