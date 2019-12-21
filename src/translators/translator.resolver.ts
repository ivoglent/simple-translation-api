import {TranslatorResolverInterface} from "./translator.resolver.interface";
import {TranslatorInterface} from "./translator.interface";
import {GoogleTranslator} from "./google.translator";
import TranslatorConfig, {TranslatorConfigInterface} from "../models/translator.config";
import {IbmTranslator} from "./ibm.translator";
import {AlibabaTranslator} from "./alibaba.translator";
import {MicrosoftTranslator} from "./microsoft.translator";

export class TranslatorResolver implements TranslatorResolverInterface{
    private translatorProviders = {
        google: GoogleTranslator,
        ibm: IbmTranslator,
        alibaba: AlibabaTranslator,
        microsoft: MicrosoftTranslator
    };

    resolve(defaultTranslator?: string): Promise<TranslatorInterface> {
        return new Promise((resolve, reject) => {
            let condition: any = {};

            if (defaultTranslator) {
                condition.name = defaultTranslator;
            } else {
                condition.default = true;
            }

            TranslatorConfig.findOne(condition,(error, translatorConfig) => {
                if (error || null == translatorConfig) {
                    return reject("No configured translator found!");
                }
                let translatorClass;
                switch (translatorConfig.name) {
                    case "google":
                        translatorClass = this.translatorProviders.google;
                        break;
                    case "ibm":
                        translatorClass = this.translatorProviders.ibm;
                        break;
                    case "alibaba":
                        translatorClass = this.translatorProviders.alibaba;
                        break;
                    case "microsoft":
                        translatorClass = this.translatorProviders.microsoft;
                        break;
                }
                if (translatorConfig.default && translatorClass) {
                    let translator: TranslatorInterface = new translatorClass();
                    translator.setAuthentication(translatorConfig.app_id, translatorConfig.app_secret);
                    return resolve(translator);
                }
                reject(new Error('No translator for default'));
            });
        })
    }

}