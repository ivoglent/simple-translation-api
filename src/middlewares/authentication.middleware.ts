import {APP_API_TOKEN} from "../config";
import {ExpressMiddlewareInterface} from "routing-controllers";
import {Context} from "koa"

export class AuthenticationMiddleware implements ExpressMiddlewareInterface{
    use(ctx: Context, next: (err?: any) => any): any {
        if (ctx.request.header['token']) {
            let token = ctx.request.header['token'];
            if (token === APP_API_TOKEN) {
                return next();
            }
        }

        ctx.response.body = {
            message: `Missing or invalid api token`
        };
        ctx.response.status = 400;
        return;
    }
}