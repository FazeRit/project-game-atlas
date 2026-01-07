import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { SmtpAuthService } from "../services/smtp-auth-service/smtp-auth.service";

@Processor('forgot-password')
export class ForgotPasswordProcessor extends WorkerHost {
    constructor(
        private readonly smtpAuthService: SmtpAuthService
    ) {
        super();
    }
    async process(job: Job<{
        email: string,
        code: string
    }>): Promise<void> {
        const {
            email,
            code
        } = job.data;

        await this.smtpAuthService.sendForgotPasswordEmail(
            email,
            code
        );
    }
}