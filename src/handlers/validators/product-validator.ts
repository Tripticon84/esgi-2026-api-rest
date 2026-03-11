import Joi from 'joi';
import { CreateProductRequest, ProductIdRequest } from '../requests/product-request.js';

export const CreateProductValidator = Joi.object<CreateProductRequest>({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required()
})

export const ProductIdValidator = Joi.object<ProductIdRequest>({
    id: Joi.number().min(1).required()
})
