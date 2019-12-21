import {TranslatorInterface} from "./translator.interface";
import {BaseTranslator} from "./translator.base";

export class IbmTranslator extends BaseTranslator  implements TranslatorInterface{
    private appId: string;
    private appSecret: string;

    setAuthentication(appId: string, appSecret: string): TranslatorInterface {
        this.appId = appId;
        this.appSecret = appSecret;
        return this;
    }

    liveTranslate(text: string, option?: object): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve("IBM Translated");
        });
    }

    getName(): string {
        return "ibm";
    }
}