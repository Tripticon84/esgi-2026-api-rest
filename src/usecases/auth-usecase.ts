import { Repository } from "typeorm";
import { User } from "../database/entities/user.js";
import { Token } from "../database/entities/token.js";
import { compare } from "bcrypt";

export class UserUsecase {
    constructor(
        private userRepository: Repository<User>,
        private tokenRepository: Repository<Token>
    ) { }

    async login({ email, password }: { email: string, password: string }): Promise<Token | null> {
        const user = await this.userRepository.findOneBy({
            email
        })
        if (!user) {
            return null;
        }

        const isValid = await compare(password, user.password)
        if (!isValid) {
            return null;
        }

        // generer un jwt 
        // l'enregistrer en DB dans la table TOKEN
        // le renvoyer au client
        return null;
    }
}
