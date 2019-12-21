import * as mongoose from "mongoose";

export interface TranslatorConfigInterface extends mongoose.Document {
    name: string;
    app_id: string;
    app_secret: string;
    default: boolean
}

export const TranslatorConfigSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    app_id: {
        type: String,
        required: true
    },
    app_secret: {
        type: String,
        required: true
    },
    default: {
        type: Boolean,
        required: false
    },
});

const TranslatorConfig = mongoose.model<TranslatorConfigInterface>("translator_config", TranslatorConfigSchema);
export default TranslatorConfig;