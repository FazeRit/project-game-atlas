import { AuthWriteService } from '../../../services/auth/auth-write-service/auth-write.service';
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards
} from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { JwtTokenResponseDto, UserCreateDto, UserResponseDto } from '../../../dto';
import { LocalAuthGuard } from '../../../guards/local.guard';
import { Public } from '../../../../../shared/decorators/public.decorator';

@Controller('/auth')
export class AuthWriteController {
	constructor(private readonly authWriteService: AuthWriteService) {}

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
	}
}