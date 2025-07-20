import { UserGateway } from "@/app/domain/gateway/user/user.gateway";
import { UseCase } from "../usecase";
import { LoginPresenter } from "@/app/presenter/user/login-user.presenter";

export type LoginUserInputDto = {
  password: string;
  phone: string;
};
export type LoginUserOutputDto = {
  body:
    | {
        user: { id: string; name: string; phone: string; role: "user" };
        token: string;
      }
    | unknown;
  statusCode: number;
};

export class LoginUserUsecase implements UseCase<LoginUserInputDto, LoginUserOutputDto> {
  private constructor(private readonly gateway: UserGateway) {}

  public static create(gateway: UserGateway) {
    return new LoginUserUsecase(gateway);
  }

  public async execute(input: LoginUserInputDto): Promise<LoginUserOutputDto> {
    try {
      const { password, phone } = input;
      const data = await this.gateway.login(phone, password);
      const response = await LoginPresenter.presenter(data);
      return response;
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }
}
