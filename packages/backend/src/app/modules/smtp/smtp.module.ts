import { EnvModule } from '../../config/env/env.module';
import { Module } from '@nestjs/common';
import { SmtpAuthService } from './services/smtp-auth-service/smtp-auth.service';
import { SmtpCoreService } from './services/smtp-code-service/smtp-core.service';
import { BullModule } from '@nestjs/bullmq';
import { ForgotPasswordProcessor } from './processors/forgot-password.processor';

@Module({
	imports: [
		EnvModule,
		BullModule.registerQueue({
			name: 'forgot-password'
		})
	],
	providers: [
		SmtpCoreService,
		SmtpAuthService,
		ForgotPasswordProcessor
	],
	exports: [
		SmtpCoreService,
		SmtpAuthService,
		BullModule
	],
})
export class SmtpModule {}

