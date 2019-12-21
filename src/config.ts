import * as dotenv from "dotenv";

//dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/../.env.test`;
        break;
    case "prd":
        path = `${__dirname}/../.env.prd`;
        break;
    default:
        path = `${__dirname}/../.env.dev`;
}
console.log(`Using path for env config : ${path}...`);
dotenv.config({ path: path });
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_PORT = process.env.DB_PORT;

export const APP_PORT = process.env.APP_PORT;
export const APP_API_TOKEN = process.env.APP_API_TOKEN;

