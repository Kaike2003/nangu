import { UseCase } from "../usecase";
import { VideoGateway } from "@/app/domain/gateway/video/video.gateway";

export type CreateVideoInputDto = {
  video: {
    filename: string;
    size: number;
    phone: string;
  }[];
  phone: string;
};
export type CreateVideoOutputDto = {
  body: string | unknown;
  statusCode: number;
};

export class CreateVideoUsecase implements UseCase<CreateVideoInputDto, CreateVideoOutputDto> {
  private constructor(private readonly gateway: VideoGateway) {}

  public static create(gateway: VideoGateway) {
    return new CreateVideoUsecase(gateway);
  }

  public async execute(input: CreateVideoInputDto): Promise<CreateVideoOutputDto> {
    try {
      const { video, phone } = input;
      const response = await this.gateway.create(video, phone);
      return response;
    } catch (error) {
      return {
        body: error,
        statusCode: 404,
      };
    }
  }
}
