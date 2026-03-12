import { AppDataSource } from "../database/database.js";
import { User } from "../database/entities/user.js";
import { ResourceConflictError } from "../usecases/error.js";
import { UserUsecase } from "../usecases/user-usecase.js";
import {
  CreateUserValidator,
  ListUsersValidator,
  UserIdValidator,
} from "./validators/user-validator.js";
import { generateValidationErrorMessage } from "./validators/utils.js";
import { Request, Response } from "express";

export const CreateUser = async (req: Request, res: Response) => {
  const validation = CreateUserValidator.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send(generateValidationErrorMessage(validation.error.details));
  }
  const createUserRequest = validation.value;
  //usecase
  const userUsecase = new UserUsecase(AppDataSource.getRepository(User));
  try {
    const user = await userUsecase.CreateUser(
      createUserRequest.email,
      createUserRequest.password,
    );
    return res.status(201).send(user);
  } catch (error: unknown) {
    if (error instanceof ResourceConflictError) {
      return res.status(409).send({
        email: "email is already taken",
      });
    }

    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

export const GetUser = async (req: Request, res: Response) => {
  const validation = UserIdValidator.validate(req.params);
  if (validation.error) {
    return res
      .status(400)
      .send(generateValidationErrorMessage(validation.error.details));
  }
  const userIdRequest = validation.value;
  const userUseCase = new UserUsecase(AppDataSource.getRepository(User));
  try {
    const user = await userUseCase.GetUser(userIdRequest.id);
    if (user === null) {
      return res.status(404).send({
        error: "product not found",
      });
    }
    return res.send(user);
  } catch (error: unknown) {
    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

export const ListUsers = async (req: Request, res: Response) => {
  const validation = ListUsersValidator.validate(req.query);
  if (validation.error) {
    return res
      .status(400)
      .send(generateValidationErrorMessage(validation.error.details));
  }
  const listUsersRequest = validation.value;
  let size = 10;
  if (listUsersRequest.size !== undefined) {
    size = listUsersRequest.size;
  }

  var page = 1;
  if (listUsersRequest.page !== undefined) {
    page = listUsersRequest.page;
  }

  const userUsecase = new UserUsecase(AppDataSource.getRepository(User));
  try {
    const user = await userUsecase.ListUsers({
      page,
      size,
    });
    return res.send(user);
  } catch (error: unknown) {
    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};
