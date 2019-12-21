import TranslatedText from "../models/translated.text";
import {TranslateOptions} from "./translate.options";

export abstract class BaseTranslator {
    public abstract liveTranslate(text: string, options?: TranslateOptions): Promise<string>;
    public abstract getName(): string;

    private dbTranslate(text: string, options?: TranslateOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            TranslatedText.findOne({
                translator: this.getName(),
                source: options.source,
                target: options.target,
                original: text
            }, (error, doc) => {
                if (error || null === doc) {
                    return reject(error);
                }
                console.log('Using DB translation...');
                resolve(doc.translated);
            });
        });
    }

    /**
     *
     * @param text
     * @param options
     */
    public translate(text: string, options?: TranslateOptions): Promise<string> {
        if (null === options) {
            options = new TranslateOptions();
        }
        return new Promise((resolve, reject) => {
            //prefered to find translated text in DB
            this.dbTranslate(text, options).then((translatedText: string) => {
                resolve(translatedText);
            }).catch((error) => {
                console.error(error);
                //If we dont have tranlated text in DB let call API
                this.liveTranslate(text, options).then((translatedText: string) => {
                    console.log('Using LIVE translation...', text, translatedText);
                    TranslatedText.create({
                        translated: translatedText,
                        translator: this.getName(),
                        source: options.source,
                        target: options.target,
                        original: text
                    }, (error: any, doc: any) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                    resolve(translatedText);
                }).catch(reject);
            })
        });
    }

    protected postApiRequest(url: string, data: any, headers?: any) : Promise<string> {
        return new Promise((resolve, reject) => {
            const request = require('request');
            let options = {
                uri: url,
                method: 'POST',
                json: data,
                headers: headers
            };

            request.post(options, function (error: any, response: any, body: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(body);
            });
        })
    }
}