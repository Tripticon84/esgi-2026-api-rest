import Joi from 'joi';
import { CreateProductRequest, ProductIdRequest, UpdateProductRequest } from '../requests/product-request.js';

export const CreateProductValidator = Joi.object<CreateProductRequest>({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required()
})

export const ProductIdValidator = Joi.object<ProductIdRequest>({
    id: Joi.number().min(1).required()
})

export const ProductUpdateValidator = Joi.object<UpdateProductRequest>({
    id: Joi.number().min(1).required(),
    name: Joi.string().min(3),
    price: Joi.number().min(1)
})
