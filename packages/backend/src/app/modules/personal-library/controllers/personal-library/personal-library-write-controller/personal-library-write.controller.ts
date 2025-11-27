import {
	Body,
	Controller,
	Delete,
	Post,
	Put
} from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibrary } from '@prisma/client';
import { PersonalLibraryCreateDto, PersonalLibraryUpdateDto } from '../../../dto';
import { PersonalLibraryWriteService } from '../../../services/personal-library/personal-library-write-service/personal-library-write.service';

@Controller('personal-libraries')
export class PersonalLibraryWriteController {
	constructor(
		private readonly personalLibraryWriteService: PersonalLibraryWriteService,
	) {}

	@Post()
	async create(
        @GetUser('checksum') userId: string,
        @Body() data: PersonalLibraryCreateDto,
    ): Promise<PersonalLibrary> {
		return this.personalLibraryWriteService.create({
			...data,
			userId
		});
	}

	@Put()
	async update(
        @GetUser('checksum') userId: string,
        @Body() data: PersonalLibraryUpdateDto,
    ): Promise<PersonalLibrary> {
		return this.personalLibraryWriteService.update(userId, data);
	}

	@Delete()
	async delete(
        @GetUser('checksum') userId: string,
    ): Promise<void> {
		return this.personalLibraryWriteService.delete(userId);
	}
}

