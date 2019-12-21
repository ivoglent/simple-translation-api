import {JsonController, Get, Req, Res} from "routing-controllers";
import {Request, Response} from "koa"

@JsonController()
export class HealthController{

    @Get("/health")
    healthCheck(@Req() request: Request, @Res() response: Response) {
        return {
            health: "OK"
        };
    }

}
