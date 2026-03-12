import { Application, Request, Response } from "express";
import { CreateProduct, DeleteProduct, GetProduct, ListProducts, UpdateProduct } from "./product-handler.js";
import { CreateUser } from "./user-handler.js";
import { Login } from "./auth-handler.js";
import { AuthMiddleware } from "./middlewares/auth-middleware.js";
import { InternalServerErrorMiddleware } from "./middlewares/error-middleware.js";

export const initHandlers = (app: Application) => {
    app.get("/", (req, res) => {
        return res.send({
            message: "Hell world"
        })
    })

    app.get("/products/:id", GetProduct)
    app.get("/products", ListProducts)
    app.post("/products",AuthMiddleware, CreateProduct)
    app.delete("/products/:id", DeleteProduct)
    app.patch("/products/:id", UpdateProduct)

    app.post("/users", CreateUser)

    app.post("/auth/login", Login)

    app.use(InternalServerErrorMiddleware)
}
