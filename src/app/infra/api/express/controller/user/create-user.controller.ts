import { CreateUserPresenter } from "@/app/presenter/user/create-user.presenter";
import { CreateUserInputDto, CreateUserUsecase } from "@/app/usecase/user/create-user.usecase";
import { formatPhone } from "@/util/formatPhone/formatPhone";
import { Request, Response } from "express";

export class CreateUserController {
  private constructor(private readonly usecase: CreateUserUsecase) {}

  public static create(usecase: CreateUserUsecase) {
    return new CreateUserController(usecase);
  }

  public async execute() {
    return async (req: Request<{}, {}, Omit<CreateUserInputDto, "id">>, res: Response) => {
      try {
        const { name, phone, password, role } = req.body;
        const aUser = { name, phone: formatPhone(phone), password, id: "", role };
        const data = await this.usecase.execute(aUser);
        const presenter = CreateUserPresenter.presenter(data);
        res.status(presenter.statusCode).json(presenter.body);
      } catch (error) {
        res.status(400).json(error instanceof Error ? error.message : String(error));
      }
    };
  }
}
