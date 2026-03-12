import { Request, Response } from "express"
import { LoginValidator } from "./validators/user-validator.js"
import { generateValidationErrorMessage } from "./validators/utils.js"

export const Login = async (req: Request, res: Response) => {
    const validation = LoginValidator.validate(req.body)
    if(validation.error) {
        res.status(400).send(generateValidationErrorMessage(validation.error.details))
        return
    }

    


}
