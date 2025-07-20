import { UserGateway } from "@/app/domain/gateway/user/user.gateway";
import { UseCase } from "../usecase";

export type ChangePasswordInputDto = {
  phone: string;
  newPassword: string;
  oldPassword: string;
};

export type ChangePasswordOuputDto = {
  body: string | unknown;
  statusCode: number;
};

export class ChangePasswordUserUsecase implements UseCase<ChangePasswordInputDto, ChangePasswordOuputDto> {
  private constructor(private readonly gateway: UserGateway) {}

  public static create(gateway: UserGateway) {
    return new ChangePasswordUserUsecase(gateway);
  }

  public async execute(input: ChangePasswordInputDto): Promise<ChangePasswordOuputDto> {
    try {
      const { newPassword, oldPassword, phone } = input;
      const data = await this.gateway.changePassword(newPassword, oldPassword, phone);
      return data;
    } catch (error) {
      return {
        body: error instanceof Error ? error.message : String(error),
        statusCode: 404,
      };
    }
  }
}
