import { Request, Response } from "express";
import { CreateUserValidator } from "./validators/user-validator.js";
import { generateValidationErrorMessage } from "./validators/utils.js";
import { AppDataSource } from "../database/database.js";
import { User } from "../database/entities/user.js";
import { UserUsecase } from "../usecases/user-usecase.js";
import { QueryError } from "mysql2";

export const CreateUser = async (req: Request, res: Response) => {
    const validator = CreateUserValidator.validate(req.body)
    if (validator.error) {
        return res.status(400).send(generateValidationErrorMessage(validator.error.details))
    }

    const createUserRequest = validator.value

    const userUsecase = new UserUsecase(AppDataSource.getRepository(User));
    try {
        const userCreated = await userUsecase.createUser(createUserRequest);
        return res.status(201).send({
            id: userCreated.id,
            email: userCreated.email,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        })
    } catch (error: unknown) {
        if ((error as QueryError).code === "ER_DUP_ENTRY") {
            return res.status(400).send({ "error": "email already exist" })
        }
        console.log(error)
        return res.status(500).send({
            error: "Internal Server Error"
        })
    }
}
