import * as mongoose from "mongoose";
import {Types} from "mongoose";


export interface TranslatedTextInterface extends mongoose.Document {
    original: string;
    translated: string;
    source: string,
    target: string,
    translator: string;
}

export const TranslatedTextSchema = new mongoose.Schema({
    original: {
        type: String,
        required: true,
        index: true,
    },
    translated: {
        type: String,
        required: true,
        index: true,
    },
    source: {
        type: String,
        required: true,
        index: true,
    },
    target: {
        type: String,
        required: true,
        index: true,
    },
    translator: {
        type: String,
        required: true,
        index: true,
    }
});
TranslatedTextSchema.index(["original", "source", "target", "translator"], {
    index: true,
    unique:  true
});

const TranslatedText = mongoose.model<TranslatedTextInterface>("translated_text", TranslatedTextSchema);
export default TranslatedText;