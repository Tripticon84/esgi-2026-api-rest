import { Request, Response } from "express"
import { ProductUsecase } from "../usecases/product-usecase.js"
import { AppDataSource } from "../database/database.js"
import { CreateProductValidator, ProductIdValidator } from "./validators/product-validator.js"
import { generateValidationErrorMessage } from "./validators/utils.js"
import { Product } from "../database/entities/product.js"
import { ResourceConflictError } from "../usecases/error.js"

export const CreateProduct = async (req: Request, res: Response) => {
    // validation
    const validation = CreateProductValidator.validate(req.body)
    if (validation.error) {
        return res.status(400).send(generateValidationErrorMessage(validation.error.details))
    }
    const createProductRequest = validation.value;
    // usecase
    const productUsecase = new ProductUsecase(AppDataSource.getRepository(Product));
    try {
        const product = await productUsecase.createProduct(createProductRequest.name, createProductRequest.price);
        return res.status(201).send(product);
    } catch(error: unknown) {
        if (error instanceof ResourceConflictError) {
            return res.status(409).send({
                name: "name is already taken"
            })
        }

        return res.status(500).send({
            error: "Internal Server Error"
        })
    }
}

export const ListProducts = async (req: Request, res: Response) => {
    const productUsecase = new ProductUsecase(AppDataSource.getRepository(Product));
    try {
        const product = await productUsecase.listProducts();
        return res.send(product);
    } catch(error: unknown) {
        return res.status(500).send({
            error: "Internal Server Error"
        })
    }
}

export const GetProduct = async (req: Request, res: Response) => {
    // validation
    const validation = ProductIdValidator.validate(req.params)
    if (validation.error) {
        return res.status(400).send(generateValidationErrorMessage(validation.error.details))
    }
    const productIdRequest = validation.value
    const productUsecase = new ProductUsecase(AppDataSource.getRepository(Product));
    try {
        const product = await productUsecase.getProduct(productIdRequest.id);
        return res.send(product);
    } catch(error: unknown) {
        return res.status(500).send({
            error: "Internal Server Error"
        })
    }
}
