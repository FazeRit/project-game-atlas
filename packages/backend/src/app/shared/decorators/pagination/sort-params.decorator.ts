import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ESortOrder } from '../../enums/sort-order.enum';

export const SortParams = createParamDecorator(
	(validFields: Array<string> = [], ctx: ExecutionContext): Record<string, ESortOrder> | undefined => {
		const req = ctx.switchToHttp().getRequest();
		const { sortParams } = req.query;

		if (!sortParams) {
			return undefined;
		}

		const sortString = String(sortParams);

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

		return {
			[field]: normalizedOrder,
		};
	},
)