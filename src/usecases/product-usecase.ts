import { DataSource, Repository } from "typeorm";
import { Product } from "../database/entities/product.js";
import { QueryError } from "mysql2";
import { ResourceConflictError } from "./error.js";

export interface ListResponse<T> {
    data: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export class ProductUsecase {
    constructor(
        private productRepository: Repository<Product>
    ) { }

    async createProduct(name: string, price: number): Promise<Product> {
        try {
            const product = this.productRepository.create({
                name,
                price
            })
            return await this.productRepository.save(product);
        } catch (error) {
            if ((error as QueryError).code === "ER_DUP_ENTRY") {
                throw new ResourceConflictError("error name is already taken")
            }

            throw error;
        }
    }

    async listProducts(page: number, size: number): Promise<ListResponse<Product>> {
        const query = this.productRepository.createQueryBuilder()
        query.skip((page - 1) * size)
        query.take(size)

        const [products, totalCount] = await query.getManyAndCount();
        return {
            data: products,
            pageSize: size,
            page,
            totalCount,
            totalPages: Math.ceil(totalCount / size)
        }
    }

    async getProduct(id: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({
            id
        });
    }

    async deleteProduct(id: number): Promise<Product | null> {
        const product = await this.getProduct(id);
        if (product === null) {
            return null;
        }
        await this.productRepository.softRemove(product);

        return product
    }

    async updateProduct(id: number, price?: number, name?: string): Promise<Product | null> {
        const product = await this.getProduct(id);
        if (product === null) {
            return null;
        }

        if (price !== undefined) {
            product.price = price
        }

        if (name !== undefined) {
            product.name = name
        }

        try {
            return await this.productRepository.save(product);
        } catch (error) {
            if ((error as QueryError).code === "ER_DUP_ENTRY") {
                throw new ResourceConflictError("error name is already taken")
            }
        }

    }
}
