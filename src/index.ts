import express from "express";
import "reflect-metadata";
import { initHandlers } from "./handlers/routes.js";
import { AppDataSource } from "./database/database.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

initHandlers(app);

try {
  await AppDataSource.initialize();
} catch (error) {
  console.log(error);
  console.log("Failed to initialized  database connection");
  process.exit(1);
}
app.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
