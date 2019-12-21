import {JsonController, Post, Req, Res, UseBefore} from "routing-controllers";
import {Request, Response} from "koa"
import {AuthenticationMiddleware} from "../middlewares/authentication.middleware";
import {TranslatorResolverInterface} from "../translators/translator.resolver.interface";
import {TranslatorResolver} from "../translators/translator.resolver";
import {TranslatorInterface} from "../translators/translator.interface";
import {TranslateOptions} from "../translators/translate.options";

@JsonController()
@UseBefore(AuthenticationMiddleware)
export class TranslateController{
    private translatorResovler: TranslatorResolverInterface;
    constructor() {
        this.translatorResovler = new TranslatorResolver();
    }

    @Post("/translate")
    translate(@Req() request: Request, @Res() response: Response) {
        let data = request.body;
        let defaultTranslator = data.translator;
        let options: TranslateOptions = new TranslateOptions(data.options);
        if (data.text) {
            return new Promise((resolve, reject) => {
                return this.translatorResovler.resolve(defaultTranslator).then((translator: TranslatorInterface) => {
                    translator.translate(data.text, options).then((translatedText: string) => {
                        return resolve({
                            text: translatedText
                        });
                    }).catch((error) => {
                        response.status = 500;
                        return reject({
                            message: error
                        });
                    });
                }).catch((error) => {
                    response.status = 500;
                    return reject({
                        message: error
                    });
                });
            })
        } else {
            response.status = 400;
            return {
                message: 'Missing text'
            }
        }
    }

}
