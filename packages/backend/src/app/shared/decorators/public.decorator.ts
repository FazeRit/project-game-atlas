import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'public'

export const Public = (): CustomDecorator<string> => {
	return SetMetadata(PUBLIC_KEY, true,)
}