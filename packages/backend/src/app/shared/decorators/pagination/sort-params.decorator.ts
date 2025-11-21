import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ESortOrder } from '../../enums/sort-order.enum';

export const SortParams = createParamDecorator(
	(validFields: Array<string> = [], ctx: ExecutionContext): Record<string, unknown> | undefined => {
		const req = ctx.switchToHttp().getRequest();
		const { sort } = req.query;

		if (!sort) {
			return undefined;
		}

		const sortString = String(sort);

		const [field, order = ESortOrder.ASC] = sortString.split(':');

		if (!field || field.trim() === '') {
			return undefined;
		}

		const normalizedOrder = order.toLowerCase() as ESortOrder;

		if (normalizedOrder !== ESortOrder.ASC && normalizedOrder !== ESortOrder.DESC) {
			return undefined;
		}

		if (validFields.length > 0 && !validFields.includes(field)) {
			return undefined;
		}

		if (field.includes('.')) {
			const parts = field.split('.');

			let nestedObject: Record<string, unknown> = {
				[parts[parts.length - 1]]: normalizedOrder
			};

			for (let i = parts.length - 2; i >= 0; i--) {
				nestedObject = {
					[parts[i]]: nestedObject
				};
			}

			return nestedObject;
		}

		return {
			[field]: normalizedOrder,
		};
	},
)