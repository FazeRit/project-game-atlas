import { CoversSeeder } from '../../seeders/covers/covers.seeder';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedingModule } from '../../seeding.module';
import 'reflect-metadata';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.createApplicationContext(SeedingModule,)

	try {
		const seeder = app.get(CoversSeeder,)
		await seeder.seed()
	} catch (error) {
        Logger.error(`Error seeding covers`, error);
		process.exit(1,)
	} finally {
		await app.close()
	}
}

bootstrap()

