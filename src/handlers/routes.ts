import { Application, Request, Response } from "express";
import { CreateProduct, DeleteProduct, GetProduct, ListProducts, UpdateProduct } from "./product-handler.js";

export const initHandlers = (app: Application) => {
    app.get("/", (req, res) => {
        return res.send({
            message: "Hell world"
        })
    })

    app.get("/products/:id", GetProduct)
    app.get("/products", ListProducts)
    app.post("/products", CreateProduct)
    app.delete("/products/:id", DeleteProduct)
    app.patch("/products/:id", UpdateProduct)
} 
