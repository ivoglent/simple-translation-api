import * as mongoose from "mongoose";
import {DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT} from "../config";

export const db = {
    connect: function () {
        return new Promise((resolve, reject) => {
            const uri: string = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
            console.log(`Connecting to mongoDB with following config : ${uri} ...`);
            mongoose.connect(uri, (err: any) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                } else {
                    console.log("Successfully Connected!");
                    resolve();
                }
            });
        });
    }
}