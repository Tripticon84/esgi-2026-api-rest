import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { unique: true, length: 255 })
    name: string

    @Column("bigint")
    price: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    constructor(
        id: number,
        name: string,
        price: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
