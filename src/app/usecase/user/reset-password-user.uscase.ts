import { UserGateway } from "@/app/domain/gateway/user/user.gateway";
import { UseCase } from "../usecase";
import { ResetPasswordUserPresenter } from "@/app/presenter/user/reset-password-user.presenter";

export type ResetPasswordUserInputDto = {
  phone: string;
};
export type ResetPasswordUserOutputDto = {
  body: string | unknown;
  statusCode: number;
};

export class ResetPasswordUserUsecase implements UseCase<ResetPasswordUserInputDto, ResetPasswordUserOutputDto> {
  private constructor(private readonly gateway: UserGateway) {}

  public static create(gateway: UserGateway) {
    return new ResetPasswordUserUsecase(gateway);
  }

  public async execute(input: ResetPasswordUserInputDto): Promise<ResetPasswordUserOutputDto> {
    try {
      const { phone } = input;
      const data = await this.gateway.resetPassword(phone);
      const response = ResetPasswordUserPresenter.presenter(data);
      return response;
    } catch (error) {
      return {
        body: error instanceof Error ? error.message : String(error),
        statusCode: 404,
      };
    }
  }
}
