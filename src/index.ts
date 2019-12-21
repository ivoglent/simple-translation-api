import "reflect-metadata";
import {APP_PORT} from "./config"
import {db} from "./components/db.connection";
import {createKoaServer} from "routing-controllers";
import {HealthController} from "./controllers/health.controller";
import {TranslateController} from "./controllers/translate.controller";
import {SetupController} from "./controllers/setup.controller";

const app = createKoaServer({
    controllers: [HealthController, TranslateController, SetupController]
});

db.connect().then(() => {
    app.listen(APP_PORT ? parseInt(APP_PORT) : 3000);

    console.log(`Server running on port ${APP_PORT}`);
}).catch((error => {
    console.log('Can not start application', error);
}));

