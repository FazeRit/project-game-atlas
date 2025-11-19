import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ScreenshotsSeeder } from '../../seeders/screenshots/screenshots.seeder';
import { SeedingModule } from '../../seeding.module';
import 'reflect-metadata';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.createApplicationContext(SeedingModule,)

	try {
		const seeder = app.get(ScreenshotsSeeder,)
		await seeder.seed()
	} catch (error) {
        Logger.error(`Error seeding screenshots`, error);
		process.exit(1,)
	} finally {
		await app.close()
	}
}

bootstrap()

