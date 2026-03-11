import { DataSource, Repository } from "typeorm";
import { Product } from "../database/entities/product.js";
import { QueryError } from "mysql2";
import { ResourceConflictError } from "./error.js";

export class ProductUsecase {
    constructor(
        private productRepository: Repository<Product>
    ) {}

    async createProduct(name: string, price: number): Promise<Product> {
        try {
            const product = this.productRepository.create({
                name,
                price
            })
            return await this.productRepository.save(product);
        } catch(error) {
            if ((error as QueryError).code === "ER_DUP_ENTRY") {
                throw new ResourceConflictError("error name is already taken")
            }

            throw error;
        }
    }

    async listProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getProduct(id: number): Promise<Product|null> {
        return await this.productRepository.findOneBy({
            id
        });
    }
}
