import 'reflect-metadata';
import { CompaniesSeeder } from '../../seeders/companies/companies.seeder';
import { NestFactory } from '@nestjs/core';
import { SeedingModule } from '../../seeding.module';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.createApplicationContext(SeedingModule,)

	try {
		const seeder = app.get(CompaniesSeeder,)
		await seeder.seed()
	} catch (error) {
		process.exit(1,)
	} finally {
		await app.close()
	}
}

bootstrap()
