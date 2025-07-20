import { GetAllVideoUsecase } from "@/app/usecase/video/getAll-video.usecase";
import { Request, Response } from "express";

export class GetAllVideoController {
  private constructor(private readonly usecase: GetAllVideoUsecase) {}

  public static create(usecase: GetAllVideoUsecase) {
    return new GetAllVideoController(usecase);
  }

  public excute() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const { body, statusCode } = await this.usecase.execute({});
        res.status(statusCode).json(body);
      } catch (error) {
        res.status(404).json(error);
      }
    };
  }
}
