import { NestFactory } from '@nestjs/core';
import { PlatformsSeeder } from '../../seeders/platforms/platforms.seeder';
import { SeedingModule } from '../../seeding.module';
import 'reflect-metadata';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.createApplicationContext(SeedingModule,)

	try {
		const seeder = app.get(PlatformsSeeder,)
		await seeder.seed()
	} catch (error) {
		process.exit(1,)
	} finally {
		await app.close()
	}
}

bootstrap()

