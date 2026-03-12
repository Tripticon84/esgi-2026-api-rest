import { DataSource, Repository } from "typeorm";
import { User } from "../database/entities/user.js";
import { ResourceConflictError } from "./error.js";
import { QueryError } from "mysql2";
import { ListUserFilter } from "../handlers/requests/user-request.js";

export interface ListResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ListProductFilter {
  page: number;
  size: number;
  priceMax?: number | undefined;
}

export class UserUsecase {
  constructor(private userRepository: Repository<User>) {}

  async CreateUser(email: string, password: string): Promise<User> {
    try {
      const user = this.userRepository.create({
        email,
        password,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      if ((error as QueryError).code === "ER_DUP_ENTRY") {
        throw new ResourceConflictError("error email is already taken");
      }
      throw error;
    }
  }

  async GetUser(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async DeleteUser(id: number): Promise<User | null> {
    const user = await this.GetUser(id);
    if (user === null) {
      return null;
    }
    await this.userRepository.softRemove(user);
    return user;
  }

  async ListUsers({
    page,
    size,
    email,
  }: ListUserFilter): Promise<ListResponse<User>> {
    const query = this.userRepository.createQueryBuilder();
    if (email !== undefined) {
      query.andWhere("email LIKE :email", { email });
    }
    query.skip((page - 1) * size);
    query.take(size);

    const [users, totalCount] = await query.getManyAndCount();
    return {
      data: users,
      pageSize: size,
      page,
      totalCount,
      totalPages: Math.ceil(totalCount / size),
    };
  }
}
