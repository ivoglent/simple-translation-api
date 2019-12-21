import {TranslateOptions} from "./translate.options";

export interface TranslatorInterface {
    setAuthentication(appId: string, appSecret: string): TranslatorInterface;
    translate(text: string, option?: TranslateOptions): Promise<string>;
    getName(): string;
}