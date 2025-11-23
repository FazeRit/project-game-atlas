import {
	Body,
	Controller,
	Delete,
	Post,
	Put,
	Query
} from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';
import { PersonalLibraryGameWriteService } from '../../../services/personal-library-game/personal-library-game-write-service/personal-library-game-write.service';

@Controller('personal-library-games')
export class PersonalLibraryGameWriteController {
	constructor(
		private readonly personalLibraryGameWriteService: PersonalLibraryGameWriteService,
	) {}

	@Post()
	async create(
        @GetUser('checksum') userId: string,
        @Body() data: PersonalLibraryGameCreateDto,
    ): Promise<PersonalLibraryGame> {
		return this.personalLibraryGameWriteService.create(userId, data);
	}

	@Put()
	async update(
        @GetUser('checksum') userId: string,
        @Body() data: PersonalLibraryGameUpdateDto,
    ): Promise<PersonalLibraryGame> {
		return this.personalLibraryGameWriteService.update(userId, data);
	}

	@Delete(':checksum')
	async delete(
        @GetUser('checksum') userId: string,
        @Query('checksum') checksum: string,
    ): Promise<void> {
		return this.personalLibraryGameWriteService.delete(userId, checksum);
	}
}