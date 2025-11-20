import { Controller, Get } from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibrary } from '@prisma/client';
import { PersonalLibraryReadService } from '../../../services/personal-library/personal-library-read-service/personal-library-read.service';

@Controller('personal-libraries')
export class PersonalLibraryReadController {
	constructor(private readonly personalLibraryReadService: PersonalLibraryReadService) {}

	@Get()
	async findByUserId(@GetUser('checksum') userId: string): Promise<PersonalLibrary | null> {
		return this.personalLibraryReadService.findByUserId(userId);
	}
}

