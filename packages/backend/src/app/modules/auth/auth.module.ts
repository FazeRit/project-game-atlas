import { AtStrategy } from './strategies/at.strategy';
import { AuthReadService } from './services/auth/auth-read-service/auth-read.service';
import { AuthWriteController } from './controllers/auth/auth-write-controller/auth-write.controller';
import { AuthWriteService } from './services/auth/auth-write-service/auth-write.service';
import { EnvEnum } from '../../config/env/enums/env.enum';
import { EnvService } from '../../config/env/services/env.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './services/jwt-token/jwt-token.service';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { OTP_PROVIDERS } from './providers/otp/otp.provider';
import { OtpService } from './services/otp/otp.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { SmtpModule } from '../smtp/smtp.module';
import { USER_PROVIDERS } from './providers/user';
import { UserReadController } from './controllers/user/user-read-controller/user-read.controller';
import { UserReadService } from './services/user/user-read-service/user-read.service';
import { UserWriteController } from './controllers/user/user-write-controller/user-write.controller';
import { UserWriteService } from './services/user/user-write-service/user-write.service';

@Module({
	imports: [
		PassportModule,
		PrismaModule,
		SmtpModule,
		JwtModule.registerAsync({
			useFactory: (envService: EnvService) => ({
				privateKey: envService.get(EnvEnum.JWT_PRIVATE_KEY),
				publicKey: envService.get(EnvEnum.JWT_PUBLIC_KEY),
				signOptions: {
					algorithm: 'RS256',
				},
			}),
			inject: [EnvService],
		}),
	],
	controllers: [
		AuthWriteController,
		UserReadController,
		UserWriteController,
	],
	providers: [
		AuthReadService,
		AuthWriteService,
		AtStrategy,
		LocalStrategy,
		JwtTokenService,
		OtpService,
		...USER_PROVIDERS,
		...OTP_PROVIDERS,
	],
	exports: [
		UserReadService,
		UserWriteService,
	]
})
export class AuthModule {}