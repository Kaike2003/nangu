import { ChangeStatusImagemInput, ChangeStatusImageUsecase } from "@/app/usecase/image/changeStatus-image.usecase";
import { Request, Response } from "express";

export class ChangeStatusImageController {
  private constructor(private readonly usecase: ChangeStatusImageUsecase) {}

  public static create(useCase: ChangeStatusImageUsecase) {
    return new ChangeStatusImageController(useCase);
  }

  public execute() {
    return async (req: Request<{}, {}, ChangeStatusImagemInput>, res: Response): Promise<void> => {
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
