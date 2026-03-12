import { Repository } from "typeorm";
import { User } from "../database/entities/user.js";
import { hash } from "bcrypt";

export class UserUsecase {
    constructor(
        private userRepository: Repository<User>
    ) { }

    async createUser({ email, password }: { email: string, password: string }): Promise<User> {
        const hashedPassword = await hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword
        })

        return await this.userRepository.save(user);
    }
}
