import { DeleteOneVideoInputDto, DeleteOneVideoUsecase } from "@/app/usecase/video/deleteOne-image.usecase";
import { Request, Response } from "express";

export class DeleteOneVideoController {
  private constructor(private readonly usecase: DeleteOneVideoUsecase) {}

  public static create(usecase: DeleteOneVideoUsecase) {
    return new DeleteOneVideoController(usecase);
  }

  public execute() {
    return async (req: Request<{}, {}, DeleteOneVideoInputDto>, res: Response) => {
      try {
        const data = req.body;
        const { body, statusCode } = await this.usecase.execute(data);
        res.status(statusCode).json(body);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
