import { LoginUserInputDto, LoginUserUsecase } from "@/app/usecase/user/login-user.usecase";
import { formatPhone } from "@/util/formatPhone/formatPhone";
import { Request, Response } from "express";

export class LoginUserController {
  private constructor(private readonly useCase: LoginUserUsecase) {}

  public static create(usecase: LoginUserUsecase) {
    return new LoginUserController(usecase);
  }

  public async execute() {
    return async (req: Request<{}, {}, LoginUserInputDto>, res: Response) => {
      try {
        const { phone, password } = req.body;
        const input = { phone: formatPhone(phone), password };
        const response = await this.useCase.execute(input);
        res.status(response.statusCode).json(response.body);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
