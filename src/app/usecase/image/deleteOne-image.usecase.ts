import { ImageGateway } from "@/app/domain/gateway/image/image.gateway";
import { UseCase } from "../usecase";

export type DeleteOneImageInputDto = {
  filename: string;
};
export type DeleteOneImageOutputDto = {
  body: string;
  statusCode: number;
};

export class DeleteOneImageUsecase implements UseCase<DeleteOneImageInputDto, DeleteOneImageOutputDto> {
  private constructor(private readonly gateway: ImageGateway) {}

  public static create(gateway: ImageGateway) {
    return new DeleteOneImageUsecase(gateway);
  }

  public async execute(input: DeleteOneImageInputDto): Promise<DeleteOneImageOutputDto> {
    try {
      const { body, statusCode } = await this.gateway.deleteOneImage(input.filename);
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
