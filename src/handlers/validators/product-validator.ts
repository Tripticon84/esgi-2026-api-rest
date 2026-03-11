import Joi from 'joi';
import { CreateProductRequest, ListProductRequest, ProductIdRequest, UpdateProductRequest } from '../requests/product-request.js';

export const CreateProductValidator = Joi.object<CreateProductRequest>({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required()
})

export const ProductIdValidator = Joi.object<ProductIdRequest>({
    id: Joi.number().min(1).required()
})

export const UpdateProductValidator = Joi.object<UpdateProductRequest>({
    id: Joi.number().min(1).required(),
    price: Joi.number().min(1).optional()
})

export const ListProductValidator = Joi.object<ListProductRequest>({
    page: Joi.number().min(1).optional(),
    size: Joi.number().min(1).max(100).optional(),
    priceMax: Joi.number().min(1).optional()
}).options({abortEarly: false})
