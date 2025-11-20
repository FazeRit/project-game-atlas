import { ForgotPasswordTemplate } from '../../templates/forgot-password.template';
import { Injectable } from '@nestjs/common';
import { SmtpCoreService } from '../smtp-code-service/smtp-core.service';

@Injectable()
export class SmtpAuthService {
	constructor(
		private readonly smtpCoreService: SmtpCoreService,
	) {}

	async sendForgotPasswordEmail(email: string, otpCode: string, userName?: string): Promise<void> {
		try {
			const subject = 'Reset Your Password';

			const html = ForgotPasswordTemplate.generateHtml(otpCode, userName);
			const text = ForgotPasswordTemplate.generateText(otpCode, userName);

			await this.smtpCoreService.sendEmail(email, subject, text, html);
		} catch (error) {
			throw error;
		}
	}
}
