import { CheckedUserPresenter } from "@/app/presenter/user/checked.user.presenter";
import { CheckedInputDto, CheckedUserUsecase } from "@/app/usecase/user/checked-user.usecase";
import { Response, Request } from "express";

export class CheckedUserController {
  private constructor(private readonly usecase: CheckedUserUsecase) {}

  public static create(usecase: CheckedUserUsecase) {
    return new CheckedUserController(usecase);
  }

  public async execute() {
    return async (req: Request<{}, {}, CheckedInputDto>, res: Response) => {
      try {
        const { secret } = req.body;
        const aUser = { secret };
        const data = await this.usecase.execute(aUser);
        const presenter = CheckedUserPresenter.presenter(data);
        res.status(presenter.statusCode).json(presenter.body);
      } catch (error) {
        res.status(400).json(error instanceof Error ? error.message : String(error));
      }
    };
  }
}
