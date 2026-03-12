import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import type { User } from "./user.js";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    token: string;

    @ManyToOne("User", (user: User) => user.tokens)
    user: User;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    constructor(
        id: number,
        token: string,
        user: User,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = id;
        this.token = token;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
