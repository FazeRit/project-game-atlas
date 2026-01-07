import { ForgotPasswordTemplate } from '../../templates/forgot-password.template';
import { Injectable } from '@nestjs/common';
import { SmtpCoreService } from '../smtp-code-service/smtp-core.service';

@Injectable()
export class SmtpAuthService {
	constructor(
		private readonly smtpCoreService: SmtpCoreService,
	) {}

	async sendForgotPasswordEmail(
		email: string,
		code: string
	): Promise<void> {
		const subject = 'Reset Your Password';

		const html = ForgotPasswordTemplate.generateHtml(code, email);
		const text = ForgotPasswordTemplate.generateText(code, email);

		await this.smtpCoreService.sendEmail(email, subject, text, html);
	}
} 
