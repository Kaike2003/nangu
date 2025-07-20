import { ChangeProfileUserInputDto, ChangeProfileUserUsecase } from "@/app/usecase/user/changeProfile-user.usecase";
import { formatPhone } from "@/util/formatPhone/formatPhone";
import { Request, Response } from "express";

export class ChangeProfileUserController {
  private constructor(private readonly usecase: ChangeProfileUserUsecase) {}

  public static create(usecase: ChangeProfileUserUsecase) {
    return new ChangeProfileUserController(usecase);
  }

  public async execute() {
    return async (req: Request<{}, {}, ChangeProfileUserInputDto>, res: Response) => {
      try {
        const { name, newPhone, oldPhone } = req.body;
        const { body, statusCode } = await this.usecase.execute({
          name,
          newPhone: formatPhone(newPhone),
          oldPhone: formatPhone(oldPhone),
        });
        res.status(statusCode).json(body);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
