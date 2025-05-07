// decorators/cookie.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export interface CookieData {
    deviceId: string;
}
export const GetCookie = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const deviceId = request.cookies["device_identifier"];
        return {
            deviceId
        } as CookieData;

    },
);
