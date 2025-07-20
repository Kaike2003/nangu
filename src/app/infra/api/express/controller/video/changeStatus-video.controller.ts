import { ChangeStatusVideoInput, ChangeStatusVideoUsecase } from "@/app/usecase/video/changeStatus-video.usecase";
import { Request, Response } from "express";

export class ChangeStatusVideoController {
  private constructor(private readonly usecase: ChangeStatusVideoUsecase) {}

  public static create(useCase: ChangeStatusVideoUsecase) {
    return new ChangeStatusVideoController(useCase);
  }

  public execute() {
    return async (req: Request<ChangeStatusVideoInput>, res: Response): Promise<void> => {
      try {
        const params = req.params;
        const { body, statusCode } = await this.usecase.execute(params);
        res.status(statusCode).json(body);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
