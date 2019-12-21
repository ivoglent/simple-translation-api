import {Body, Delete, Get, JsonController, Param, Post, Put, Req, Res, UseBefore} from "routing-controllers";
import {Request, Response} from "koa"
import {AuthenticationMiddleware} from "../middlewares/authentication.middleware";
import TranslatorConfig, {TranslatorConfigInterface} from "../models/translator.config";
import * as mongoose from "mongoose";
const ObjectId = mongoose.mongo.ObjectId;



@JsonController()
@UseBefore(AuthenticationMiddleware)
export class SetupController {
    @Get("/setup/translators")
    getTranslatorConfigs(@Req() request: Request, @Res() response: Response) {
        return new Promise((resolve, reject) => {
            TranslatorConfig.find({},(error, docs) => {
                if (error) {
                    return reject(error);
                }
                return resolve(docs.map((doc) => {
                    return {
                        id: doc._id.toString(),
                        name: doc.name,
                        app_id: doc.app_id,
                        app_secret: doc.app_secret,
                        default: doc.default
                    }
                }));
            })
        });
    }

    @Post("/setup/translators")
    createTranslatorConfig(@Body() translatorConfig: TranslatorConfigInterface) {
        return new Promise((resolve, reject) => {
            TranslatorConfig.create(translatorConfig, (error: any, doc: TranslatorConfigInterface) => {
                 if (error) {
                     return reject(error);
                 }
                return resolve({
                    id: doc._id.toString(),
                    name: doc.name,
                    app_id: doc.app_id,
                    app_secret: doc.app_secret,
                    default: doc.default
                });
            })
        });
    }

    @Put("/setup/translators/:id")
    updateTranslatorConfig(@Param("id") id: string, @Body()translatorConfig: TranslatorConfigInterface) {
        console.log(translatorConfig);
        return new Promise((resolve, reject) => {
            TranslatorConfig.findOneAndUpdate({_id: (id)}, translatorConfig , {upsert: true, new: true}, (error: any, doc: TranslatorConfigInterface) => {
                if (error || null === doc) {
                    return reject(error);
                }
                return resolve({
                    id: doc._id.toString(),
                    name: doc.name,
                    app_id: doc.app_id,
                    app_secret: doc.app_secret,
                    default: doc.default
                });
            })
        });
    }

    @Delete("/setup/translators/:id")
    removeTranslatorConfig(@Param("id") id: string) {
        return new Promise((resolve, reject) => {
            TranslatorConfig.findOneAndRemove({_id:  (id)},(error: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve({
                    "message" : "Removed successfully!"
                });
            })
        });
    }
}