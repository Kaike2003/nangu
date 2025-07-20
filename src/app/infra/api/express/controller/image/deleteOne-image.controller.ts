import { DeleteOneImageInputDto, DeleteOneImageUsecase } from "@/app/usecase/image/deleteOne-image.usecase";
import { Request, Response } from "express";

export class DeleteOneImageController {
  private constructor(private readonly usecase: DeleteOneImageUsecase) {}

  public static create(usecase: DeleteOneImageUsecase) {
    return new DeleteOneImageController(usecase);
  }

  public execute() {
    return async (req: Request<{}, {}, DeleteOneImageInputDto>, res: Response) => {
      try {
        const { filename } = req.body;
        const { body, statusCode } = await this.usecase.execute({ filename });
        res.status(statusCode).json(body);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
