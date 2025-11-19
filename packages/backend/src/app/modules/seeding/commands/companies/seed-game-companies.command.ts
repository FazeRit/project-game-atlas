import { GameCompaniesSeeder } from '../../seeders/companies/game-companies.seeder';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedingModule } from '../../seeding.module';
import 'reflect-metadata';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.createApplicationContext(SeedingModule,)

	try {
		const seeder = app.get(GameCompaniesSeeder,)
		await seeder.seed()
	} catch (error) {
        Logger.error(`Error seeding game companies`, error);
		process.exit(1,)
	} finally {
		await app.close()
	}
}

bootstrap()

