import { ImageGateway, TypeImage } from "@/app/domain/gateway/image/image.gateway";
import { UseCase } from "../usecase";

export type GetAllImageInputDto = {};

export type GetAllImageoutputDto = {
  body: string | TypeImage[];
  statusCode: number;
};

export class GetAllImageUsecase implements UseCase<GetAllImageInputDto, GetAllImageoutputDto> {
  private constructor(private readonly gateway: ImageGateway) {}

  public static create(gateway: ImageGateway) {
    return new GetAllImageUsecase(gateway);
  }

  public async execute(input: GetAllImageInputDto): Promise<GetAllImageoutputDto> {
    try {
      const { body, statusCode } = await this.gateway.getAllImage();
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
