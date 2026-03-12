import { DataSource } from "typeorm";
import { Product } from "./entities/product.js";
import { User } from "./entities/user.js";
import { Token } from "./entities/token.js";

console.log(process.env.DB_HOST)

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: "root",
    password: "your_password",
    database: "your_database",
    synchronize: true,
    logging: true,
    entities: [Product, User, Token]
})
