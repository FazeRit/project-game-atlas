import {
	Exclude,
	Expose,
	Transform,
	Type
} from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GameFiltersDto {
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
		genres?: Array<string>;
		keywords?: Array<string>;
		userId?: string;
	}) {
		this.genres = data?.genres;
		this.keywords = data?.keywords;
	}
}