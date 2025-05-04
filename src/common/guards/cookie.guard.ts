
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class CookieGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        if (!request.cookies['device_identifier']) {
            response.cookie('device_identifier', v4(), {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }

        return true;
    }
}
