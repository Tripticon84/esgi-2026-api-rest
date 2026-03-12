import { NextFunction, Response, Request } from "express";

export const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log({
            method: req.method,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        })
    });
    next();
}
