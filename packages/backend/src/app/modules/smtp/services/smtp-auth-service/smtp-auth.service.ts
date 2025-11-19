import { ForgotPasswordTemplate } from '../../templates/forgot-password.template';
import { Injectable, Logger } from '@nestjs/common';
import { SmtpCoreService } from '../smtp-code-service/smtp-core.service';

@Injectable()
export class SmtpAuthService {
	private readonly logger = new Logger(SmtpAuthService.name);

	constructor(
		private readonly smtpCoreService: SmtpCoreService,
	) {}

	async sendForgotPasswordEmail(email: string, otpCode: string, userName?: string): Promise<void> {
		try {
			this.logger.log(`Sending forgot password email to: ${email}, userName: ${userName || 'N/A'}`);

			const subject = 'Reset Your Password';

			const html = ForgotPasswordTemplate.generateHtml(otpCode, userName);
			const text = ForgotPasswordTemplate.generateText(otpCode, userName);

			await this.smtpCoreService.sendEmail(email, subject, text, html);

			this.logger.log(`Forgot password email sent successfully to: ${email}`);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			this.logger.error(`Failed to send forgot password email to: ${email}`, errorMessage);
			throw error;
		}
	}
}
