import { UserGateway } from "@/app/domain/gateway/user/user.gateway";
import { UseCase } from "../usecase";

export type ChangeProfileUserInputDto = {
  name: string;
  newPhone: string;
  oldPhone: string;
};

export type ChangeProfileUserOutputDto = {
  body: string | unknown;
  statusCode: number;
};

export class ChangeProfileUserUsecase implements UseCase<ChangeProfileUserInputDto, ChangeProfileUserOutputDto> {
  private constructor(private readonly gateway: UserGateway) {}

  public static create(gateway: UserGateway) {
    return new ChangeProfileUserUsecase(gateway);
  }

  public async execute(input: ChangeProfileUserInputDto): Promise<ChangeProfileUserOutputDto> {
    try {
      const { name, newPhone, oldPhone } = input;
      const data = await this.gateway.changeProfile(name, newPhone, oldPhone);
      return data;
    } catch (error) {
      return {
        body: error instanceof Error ? error.message : String(error),
        statusCode: 404,
      };
    }
  }
}
