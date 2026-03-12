import Joi from 'joi';
import { CreateUserRequest, ListUserFilter, UserIdRequest } from '../requests/user-request.js';

export const CreateUserValidator = Joi.object<CreateUserRequest>({
    email: Joi.string().min(3).email().required(),
    password: Joi.string().min(6).required()
})

export const UserIdValidator = Joi.object<UserIdRequest>({
    id: Joi.number().min(1).required()
})

export const ListUsersValidator = Joi.object<ListUserFilter>({
    page: Joi.number().min(1).default(1),
    size: Joi.number().min(1).max(100).default(10),
    email: Joi.string().email()
})
