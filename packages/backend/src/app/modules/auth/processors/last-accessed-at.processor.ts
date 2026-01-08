import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { UserWriteService } from "../services/user/user-write-service/user-write.service";

@Processor('last-accessed-at')
export class LastAccessedAtProcessor extends WorkerHost {
    constructor(
        private readonly userWriteService: UserWriteService
    ) {
        super();
    }

    
    async process(job: Job<{
        userId: string
    }>): Promise<void> {
        const {
            userId
        } = job.data;

        const lastAccessedAt = new Date().toISOString();

        await this.userWriteService.update(userId, {
            lastAccessedAt
        })
    }
}