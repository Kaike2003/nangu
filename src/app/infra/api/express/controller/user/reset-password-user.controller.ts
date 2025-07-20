import { ResetPasswordUserPresenter } from "@/app/presenter/user/reset-password-user.presenter";
import { ResetPasswordUserInputDto, ResetPasswordUserUsecase } from "@/app/usecase/user/reset-password-user.uscase";
import { formatPhone } from "@/util/formatPhone/formatPhone";
import { Response, Request, response } from "express";

export class ResetPasswordUserController {
  private constructor(private readonly usecase: ResetPasswordUserUsecase) {}

  public static create(usecase: ResetPasswordUserUsecase) {
    return new ResetPasswordUserController(usecase);
  }

  public async execute() {
    return async (req: Request<{}, {}, ResetPasswordUserInputDto>, res: Response) => {
      try {
        const { phone } = req.body;
        const aUser = { phone: formatPhone(phone) };
        const data = await this.usecase.execute(aUser);
        const presenter = await ResetPasswordUserPresenter.presenter(data);
        res.status(presenter.statusCode).json(presenter.body);
      } catch (error) {
        response.status(400).json(error);
      }
    };
  }
}
