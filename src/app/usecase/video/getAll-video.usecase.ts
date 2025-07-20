import { ImageGateway, TypeImage } from "@/app/domain/gateway/image/image.gateway";
import { UseCase } from "../usecase";
import { VideoGateway } from "@/app/domain/gateway/video/video.gateway";

export type GetAllVideoInputDto = {};

export type GetAllVideoOutputDto = {
  body: string | TypeImage[];
  statusCode: number;
};

export class GetAllVideoUsecase implements UseCase<GetAllVideoInputDto, GetAllVideoOutputDto> {
  private constructor(private readonly gateway: VideoGateway) {}

  public static create(gateway: VideoGateway) {
    return new GetAllVideoUsecase(gateway);
  }

  public async execute(input: GetAllVideoInputDto): Promise<GetAllVideoOutputDto> {
    try {
      const { body, statusCode } = await this.gateway.getAllVideo();
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
