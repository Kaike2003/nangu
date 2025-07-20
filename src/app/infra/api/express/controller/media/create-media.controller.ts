import { Request, Response } from "express";

export class CreateMediaController {
  private constructor() {}

  public static create() {
    return new CreateMediaController();
  }

  public execute() {
    return async (req: Request, res: Response) => {
      res.status(200).json("upload imagem");
    };
  }
}
