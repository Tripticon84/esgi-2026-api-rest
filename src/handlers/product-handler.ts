import { Request, Response } from "express";
import { AppDataSource } from "../database/database.js";
import { CreateProductValidator } from "./validators/products-validators.js";

export const CreateProduct = async (req: Request, res: Response) => {
  // name
  // price

  // Validation des paramètres d'entrées
  const validation = CreateProductValidator.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details);
  }

  const productUsecase = new ProductsUseCase(AppDataSource);
  const product = await productUsecase.createProduct(req.body.name, req.body.price);

  return res.status(201).send({
    message: "Product created",
    product,
  });
};
