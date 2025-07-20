import { UserGateway } from "@/app/domain/gateway/user/user.gateway";
import { UseCase } from "../usecase";
import { CheckedUserPresenter } from "@/app/presenter/user/checked.user.presenter";

export type CheckedInputDto = {
  secret: string;
};
export type CheckedOutputDto = {
  body: string | unknown;
  statusCode: number;
};

export class CheckedUserUsecase implements UseCase<CheckedInputDto, CheckedOutputDto> {
  private constructor(private readonly gateway: UserGateway) {}

  public static create(gateway: UserGateway) {
    return new CheckedUserUsecase(gateway);
  }

  public async execute(input: CheckedInputDto): Promise<CheckedOutputDto> {
    try {
      const { secret } = input;
      const data = await this.gateway.checked(secret);
      const response = CheckedUserPresenter.presenter(data);
      return response;
    } catch (error) {
      return {
        body: error instanceof Error ? error.message : String(error),
        statusCode: 404,
      };
    }
  }
}
