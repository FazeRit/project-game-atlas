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
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { USER_PROVIDERS } from './providers/user';

@Module({
	imports: [
		PassportModule,
		PrismaModule,
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
	],
	providers: [
		AuthReadService,
		AuthWriteService,
		LocalStrategy,
		AtStrategy,
		JwtTokenService,
		...USER_PROVIDERS,
	],
	exports: []
})
export class AuthModule {}