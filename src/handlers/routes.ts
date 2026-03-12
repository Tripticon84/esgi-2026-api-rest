import { Application, Request, Response } from "express";
import { CreateProduct, DeleteProduct, GetProduct, ListProducts, UpdateProduct } from "./product-handler.js";
import { CreateUser } from "./user-handler.js";

export const initHandlers = (app: Application) => {
  app.get("/", (req, res) => {
    return res.send({
      message: "Hello world",
    });
  });

    app.get("/products/:id", GetProduct)
    app.get("/products", ListProducts)
    app.post("/products", CreateProduct)
    app.delete("/products/:id", DeleteProduct)
    app.patch("/products/:id", UpdateProduct)

    app.post("/users", CreateUser)

}
