import { NextFunction, Response, Request } from "express";

export const InternalServerErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    return res.status(500).send({
        error: "Internal Server Error"
    })
}


