import { Application, Request, Response } from "express";
import { CreateProduct, DeleteProduct, GetProduct, ListProducts, UpdateProduct } from "./product-handler.js";
import { CreateUser } from "./user-handler.js";
import { Login } from "./auth-handler.js";
import { AuthMiddleware } from "./middlewares/auth-middleware.js";
import { InternalServerErrorMiddleware, NotFoundMiddleware } from "./middlewares/error-middleware.js";
import { LoggerMiddleware } from "./middlewares/logger-middleware.js";

export const initHandlers = (app: Application) => {
    app.use(LoggerMiddleware)
    app.get("/", (req, res) => {
        return res.send({
            message: "Hell world"
        })
    })

    app.get("/products/:id", GetProduct)
    app.get("/products", ListProducts)
    
    /**
    * @openapi
    * '/products':
    *  post:
    *     tags:
    *     - Products
    *     summary: Create a new product
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/CreateProduct'
    *     responses:
    *       200:
    *         description: Product created
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/Product'
    */
    app.post("/products",AuthMiddleware, CreateProduct)
    app.delete("/products/:id", DeleteProduct)
    app.patch("/products/:id", UpdateProduct)

    app.post("/users", CreateUser)

    app.post("/auth/login", Login)
}
