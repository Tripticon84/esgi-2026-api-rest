import express from "express"
import "reflect-metadata"
import { initHandlers } from "./handlers/routes.js";
import { AppDataSource } from "./database/database.js";
import { swaggerDocs } from "./handlers/swagger/swagger.js";
import { InternalServerErrorMiddleware, NotFoundMiddleware } from "./handlers/middlewares/error-middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())

initHandlers(app);

swaggerDocs(app, PORT)

app.use(NotFoundMiddleware)
app.use(InternalServerErrorMiddleware)
try {
    await AppDataSource.initialize();
} catch (error) {
    console.log(error)
    console.log("failed to initialized database conection")
    process.exit(1)
}
app.listen(PORT, () => {
    console.log("App is listening on port " + PORT)
})
