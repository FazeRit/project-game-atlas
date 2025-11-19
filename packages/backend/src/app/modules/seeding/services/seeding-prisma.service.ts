import { Injectable } from '@nestjs/common';
import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SeedingPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	public async onModuleInit() {
		await this.$connect()
	}

	public async onModuleDestroy() {
		await this.$disconnect()
	}
}