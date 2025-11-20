import { Controller, Get } from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameReadService } from '../../../services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service';

@Controller('personal-library-games')
export class PersonalLibraryGameReadController {
	constructor(
		private readonly personalLibraryGameReadService: PersonalLibraryGameReadService,
	) {}

	@Get()
	async findByUserId(@GetUser('checksum') userId: string): Promise<PersonalLibraryGame[]> {
		return this.personalLibraryGameReadService.findByUserId(userId);
	}
}

