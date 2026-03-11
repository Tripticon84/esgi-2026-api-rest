import { DataSource } from "typeorm";
import { Product } from "./entities/products.js";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "192.168.66.65",
  port: 3306,
  username: "user",
  password: "pass",
  database: "database",
  synchronize: true,
  logging: true,
  entities: [Product]
});
