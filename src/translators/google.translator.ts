import {TranslatorInterface} from "./translator.interface";
import {BaseTranslator} from "./translator.base";
import {TranslateOptions} from "./translate.options";

export class GoogleTranslator extends BaseTranslator  implements TranslatorInterface{
    private appId: string;
    private appSecret: string;

    private endPoint = 'https://translation.googleapis.com/language/translate/v2';

    setAuthentication(appId: string, appSecret: string): TranslatorInterface {
        this.appId = appId;
        this.appSecret = appSecret;
        return this;
    }

    liveTranslate(text: string, option?: TranslateOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            this.postApiRequest(this.endPoint + '?key=' + this.appSecret, {
                'q':  text,
                'source': option.source,
                'target': option.target,
                'format': option.format
            }, {
                "Content-Type": "application/json"
            }).then((response) => {
                console.log(response);
                let json: any = typeof response == 'object' ? response : JSON.parse(response);
                if(json && json.data && json.data.translations) {
                    resolve(json.data.translations[0].translatedText)
                } else {
                    if (json.error) {
                        return reject(json.error.message);
                    }
                    reject("Can not translate!");
                }
            }).catch((error) => {
                console.error(error);
                reject(error.toString());
            })
        });
    }

    getName(): string {
        return "google";
    }
}