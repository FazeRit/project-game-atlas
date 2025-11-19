import { GamesSeeder } from '../../seeders/games/games.seeder';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedingModule } from '../../seeding.module';
import 'reflect-metadata';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.createApplicationContext(SeedingModule,)

	try {
		const seeder = app.get(GamesSeeder,)
		await seeder.seed()
	} catch (error) {
        Logger.error(`Error seeding games`, error);
		process.exit(1,)
	} finally {
		await app.close()
		process.exit(0)
	}
}

bootstrap()

