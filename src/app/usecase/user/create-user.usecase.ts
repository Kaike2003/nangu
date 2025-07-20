import { CreateUserValidation } from "@/app/domain/entity/validation/user/create-user.validation";
import { User } from "../../domain/entity/user/user.entity";
import { UserGateway } from "../../domain/gateway/user/user.gateway";
import { CreateUserPresenter } from "../../presenter/user/create-user.presenter";
import { UseCase } from "../usecase";

export type CreateUserInputDto = {
  id: string;
  name: string;
  phone: string;
  password: string;
  role: "admin" | "user";
};
export type CreateUserOutputDto = {
  statusCode: number;
  body: { id: string; name: string; phone: string; role: "user" } | unknown;
};

export class CreateUserUsecase implements UseCase<CreateUserInputDto, CreateUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new CreateUserUsecase(userGateway);
  }

  public async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    try {
      const { password, phone, name, role } = input;
      const user = { phone, name, password, role };
      const validator = CreateUserValidation.create();
      const aUser = User.create(user, validator);
      const data = await this.userGateway.create(aUser);
      const response = CreateUserPresenter.presenter(data);
      return response;
    } catch (error) {
      return {
        body: error instanceof Error ? error.message : String(error),
        statusCode: 404,
      };
    }
  }
}
