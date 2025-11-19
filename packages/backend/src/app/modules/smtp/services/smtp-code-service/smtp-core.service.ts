import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class SmtpCoreService {
	private readonly logger = new Logger(SmtpCoreService.name);
	private readonly resend: Resend;
	private readonly apiKey: string;

	constructor(
		private readonly envService: EnvService,
	) {
		this.apiKey = this.envService.get(EnvEnum.RESEND_API_KEY);

		if (!this.apiKey) {
			this.logger.error('RESEND_API_KEY is not set in environment variables');
			throw new Error('RESEND_API_KEY environment variable is required');
		}

		this.resend = new Resend(this.apiKey);
	}

	async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
		try {
			const { data, error } = await this.resend.emails.send({
				from: 'onboarding@resend.dev',
				to: [to],
				subject: subject,
				html: html || text,
				text: text,
			});

			if (error) {
				throw error;
			}

			this.logger.log(`Email sent successfully to: ${to}, messageId: ${data?.id || 'unknown'}`);
		} catch (error: any) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			
			if (error?.statusCode === 401 || error?.status === 401) {
				this.logger.error(`Authentication failed - Please verify your RESEND_API_KEY. Error: ${errorMessage}`);
			} else if (error?.statusCode === 403 || error?.status === 403) {
				this.logger.error(`Authorization failed - Domain not verified. Error: ${errorMessage}`);
			} else {
				this.logger.error(`Failed to send email to: ${to}`, errorMessage);
			}
			
			throw error;
		}
	}
}
