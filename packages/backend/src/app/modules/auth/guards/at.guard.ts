import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from '../../../shared/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtAuthGuard extends AuthGuard('at') implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) {
        super();
    }

    public override canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(
			PUBLIC_KEY,
			[
				context.getHandler(),
				context.getClass(),
			],
		)

		if (isPublic) {
			return true
		}

		return super.canActivate(context,)
	}
}