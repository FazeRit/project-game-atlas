import { EnvModule } from '../../config/env/env.module';
import { Module } from '@nestjs/common';
import { SmtpAuthService } from './services/smtp-auth-service/smtp-auth.service';
import { SmtpCoreService } from './services/smtp-code-service/smtp-core.service';

@Module({
	imports: [
		EnvModule,
	],
	providers: [
		SmtpCoreService,
		SmtpAuthService,
	],
	exports: [
		SmtpCoreService,
		SmtpAuthService,
	],
})
export class SmtpModule {}

