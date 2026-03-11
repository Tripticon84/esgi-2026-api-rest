import { Request, Response } from "express"
import { ProductUsecase } from "../usecases/product-usecase.js"
import { AppDataSource } from "../database/database.js"
import { CreateProductValidator, ListProductValidator, ProductIdValidator, UpdateProductValidator } from "./validators/product-validator.js"
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
    } catch (error: unknown) {
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
    const validation = ListProductValidator.validate(req.query)
    if (validation.error) {
        return res.status(400).send(generateValidationErrorMessage(validation.error.details))
    }
    const listProductRequest = validation.value
    var size = 10;
    if (listProductRequest.size !== undefined) {
        size = listProductRequest.size
    }

    var page = 1;
    if (listProductRequest.page !== undefined) {
        page = listProductRequest.page
    }

    const productUsecase = new ProductUsecase(AppDataSource.getRepository(Product));
    try {
        const product = await productUsecase.listProducts({
            page,
            size,
            priceMax: listProductRequest.priceMax
        });
        return res.send(product);
    } catch (error: unknown) {
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
        if (product === null) {
            return res.status(404).send({
                error: "product not found"
            })
        }
        return res.send(product);
    } catch (error: unknown) {
        return res.status(500).send({
            error: "Internal Server Error"
        })
    }
}

export const DeleteProduct = async (req: Request, res: Response) => {
    const validation = ProductIdValidator.validate(req.params)
    if (validation.error) {
        return res.status(400).send(generateValidationErrorMessage(validation.error.details))
    }
    const productIdRequest = validation.value

    const productUsecase = new ProductUsecase(AppDataSource.getRepository(Product));
    try {
        const productDeleted = await productUsecase.deleteProduct(productIdRequest.id);
        if (productDeleted === null) {
            return res.status(404).send({
                error: "product not found"
            })
        }
        return res.send(productDeleted);
    } catch (error) {
        return res.status(500).send({
            error: "Internal Server Error"
        })
    }
}

export const UpdateProduct = async (req: Request, res: Response) => {
    //{id: "1"} {price: 12} {id: "1", price: 12} {...req.params, ...req.body}
    const validation = UpdateProductValidator.validate({ ...req.params, ...req.body })
    if (validation.error) {
        return res.status(400).send(generateValidationErrorMessage(validation.error.details))
    }
    const updateProductRequest = validation.value
    const productUsecase = new ProductUsecase(AppDataSource.getRepository(Product));
    try {
        const productUpdated = await productUsecase.updateProduct(
            updateProductRequest.id,
            updateProductRequest.price,
            updateProductRequest.name
        )
        if (productUpdated === null) {
            return res.status(404).send({
                error: "product not found"
            })
        }

        return res.send(productUpdated)
    } catch (error) {
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
