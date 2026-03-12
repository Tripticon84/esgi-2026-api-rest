import Joi from "joi";
import { CreateUserRequest, LoginRequest } from "../requests/user-request.js";

export const CreateUserValidator = Joi.object<CreateUserRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export const LoginValidator = Joi.object<LoginRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})
