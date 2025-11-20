import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class SmtpCoreService {
	private readonly resend: Resend;
	private readonly apiKey: string;

	constructor(
		private readonly envService: EnvService,
	) {
		this.apiKey = this.envService.get(EnvEnum.RESEND_API_KEY);

		if (!this.apiKey) {
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
		} catch (error: any) {
			throw error;
		}
	}
}
