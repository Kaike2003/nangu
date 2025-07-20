import { ImageGateway } from "@/app/domain/gateway/image/image.gateway";
import { UseCase } from "../usecase";

export type ChangeStatusImagemInput = {
  filename: string;
};
export type ChangeStatusImagemOutput = {
  body: string;
  statusCode: number;
};

export class ChangeStatusImageUsecase implements UseCase<ChangeStatusImagemInput, ChangeStatusImagemOutput> {
  private constructor(private readonly gateway: ImageGateway) {}

  public static create(gateway: ImageGateway) {
    return new ChangeStatusImageUsecase(gateway);
  }

  public async execute(input: ChangeStatusImagemInput): Promise<ChangeStatusImagemOutput> {
    try {
      const { body, statusCode } = await this.gateway.changeStatus(input.filename);
      return {
        statusCode,
        body,
      };
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }
}
