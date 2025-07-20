import { ImageGateway } from "@/app/domain/gateway/image/image.gateway";
import { UseCase } from "../usecase";
import { Image } from "@/app/domain/entity/image/image.entity";

export type CreateImageInputDto = {
  images: {
    filename: string;
    size: number;
    phone: string;
  }[];
  phone: string;
};
export type CreateImageOutputDto = {
  body: string | unknown;
  statusCode: number;
};

export class CreateImageUsecase implements UseCase<CreateImageInputDto, CreateImageOutputDto> {
  private constructor(private readonly gateway: ImageGateway) {}

  public static create(gateway: ImageGateway) {
    return new CreateImageUsecase(gateway);
  }

  public async execute(input: CreateImageInputDto): Promise<CreateImageOutputDto> {
    try {
      const { images, phone } = input;
      const response = await this.gateway.create(images, phone);

      return response;
    } catch (error) {
      return {
        body: error,
        statusCode: 404,
      };
    }
  }
}
