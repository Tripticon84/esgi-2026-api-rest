import Joi from "joi";
import { CreateProductRequest } from "../requests/products-requests.js";

export const CreateProductValidator = Joi.object<CreateProductRequest>({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().optional(),
});
