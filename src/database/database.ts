import { DataSource } from "typeorm";
import { Product } from "./entities/product.js";
import { User } from "./entities/user.js";
import { Token } from "./entities/token.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "192.168.66.65",
    port: 3306,
    username: "user",
    password: "pass",
    database: "database",
    synchronize: true,
    logging: true,
    entities: [Product, User, Token]
})
