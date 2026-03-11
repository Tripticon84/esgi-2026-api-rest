import { Application, Request, Response } from "express";

export const initHandlers = (app: Application) => {
  app.get("/", (req, res) => {
    return res.send({
      message: "Hello World !!",
    });
  });

  app.get("/products", (req: Request, res: Response) => {
    return res.send([
      { id: 1, name: "Courgette" },
      { id: 2, name: "Ail" },
      { id: 3, name: "Banane" },
    ]);
  });
};
