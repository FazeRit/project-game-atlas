import { EPlayStatus, ETierRank } from '@prisma/client';
import {
	Exclude,
	Expose,
	Transform,
	Type
} from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsOptional,
	IsString
} from 'class-validator';

@Exclude()
export class PersonalLibraryGameFiltersDto {
	@Expose()
	@IsOptional()
	@IsArray()
	@IsEnum(EPlayStatus, { each: true })
	@Type(() => String)
	status?: Array<EPlayStatus>;

	@Expose()
	@IsOptional()
	@IsArray()
	@IsEnum(ETierRank, { each: true })
	@Type(() => String)
	rank?: Array<ETierRank>;

	@Expose()
	@IsOptional()
	@Transform(({ value }) => {
		if (value === undefined || value === null) return undefined;

		if (Array.isArray(value)) {
			return value.filter(v => v !== undefined && v !== null);
		}

		return [value];
	})
	@IsArray()
	@IsString({ each: true })
	@Type(() => String)
	genres?: Array<string>;

	@Expose()
	@IsOptional()
	@Transform(({ value }) => {
		if (value === undefined || value === null) return undefined;

		if (Array.isArray(value)) {
			return value.filter(v => v !== undefined && v !== null);
		}

		return [value];
	})
	@IsArray()
	@IsString({ each: true })
	@Type(() => String)
	keywords?: Array<string>;

	constructor(data?: {
		status?: Array<EPlayStatus>;
		rank?: Array<ETierRank>;
		genres?: Array<string>;
		keywords?: Array<string>;
	}) {
		this.status = data?.status;
		this.rank = data?.rank;
		this.genres = data?.genres;
		this.keywords = data?.keywords;
	}
}

