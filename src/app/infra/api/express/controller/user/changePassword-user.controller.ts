import { ChangePasswordInputDto, ChangePasswordUserUsecase } from "@/app/usecase/user/changePassword-user.usecase";
import { formatPhone } from "@/util/formatPhone/formatPhone";
import { Request, Response } from "express";

export class ChangePasswordUserController {
  private constructor(private readonly usecase: ChangePasswordUserUsecase) {}

  public static create(usecase: ChangePasswordUserUsecase) {
    return new ChangePasswordUserController(usecase);
  }

  public async execute() {
    return async (req: Request<{}, {}, ChangePasswordInputDto>, res: Response) => {
      try {
        const { newPassword, oldPassword } = req.body;
        const phone = formatPhone(req.headers["user-phone"] as string);
        const data = { newPassword, oldPassword, phone };
        const { body, statusCode } = await this.usecase.execute(data);
        res.status(statusCode).json(body);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
