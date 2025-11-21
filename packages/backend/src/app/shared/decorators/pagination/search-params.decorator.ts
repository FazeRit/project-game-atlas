import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SearchParams = createParamDecorator(
	(validFields: Array<string> = [], ctx: ExecutionContext): Record<string, unknown> => {
		const req = ctx.switchToHttp().getRequest();
		const {
			searchQuery
		} = req.query;

		if (!searchQuery) {
			return {};
		}

		if (validFields.length > 0) {
			return {
				OR: validFields.map(field => {
					if (field.includes('.')) {
						const parts = field.split('.');

						let nestedObject: Record<string, unknown> = {
							contains: searchQuery,
							mode: 'insensitive',
						};

						for (let i = parts.length - 1; i >= 0; i--) {
							nestedObject = {
								[parts[i]]: nestedObject
							};
						}

						return nestedObject;
					}

					return {
						[field]: {
							contains: searchQuery,
							mode: 'insensitive',
						}
					};
				})
			};
		}

		return {};
	},
)