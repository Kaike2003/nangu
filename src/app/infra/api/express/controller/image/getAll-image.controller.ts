import { GetAllImageUsecase } from "@/app/usecase/image/getAll-image.usecase";
import { Request, Response } from "express";

export class GetAllImageController {
  private constructor(private readonly usecase: GetAllImageUsecase) {}

  public static create(usecase: GetAllImageUsecase) {
    return new GetAllImageController(usecase);
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
