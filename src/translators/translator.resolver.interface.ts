import {TranslatorInterface} from "./translator.interface";

export interface TranslatorResolverInterface {
    resolve(defaultTranslator?: string) : Promise<TranslatorInterface>
}