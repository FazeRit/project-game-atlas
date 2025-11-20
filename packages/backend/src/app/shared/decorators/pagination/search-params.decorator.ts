import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SearchParams = createParamDecorator(
	(validFields: Array<string> = [], ctx: ExecutionContext): Record<string, unknown> => {
		const req = ctx.switchToHttp().getRequest();
		const { searchQuery } = req.query;

		if (!searchQuery) {
			return {};
		}

		if (validFields.length > 0) {
			return {
				OR: validFields.map(field => ({
					[field]: {
						contains: searchQuery,
						mode: 'insensitive',
					}
				}))
			};
		}

		return {};
	},
)