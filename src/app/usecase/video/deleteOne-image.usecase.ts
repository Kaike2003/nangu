import { ImageGateway } from "@/app/domain/gateway/image/image.gateway";
import { UseCase } from "../usecase";
import { VideoGateway } from "@/app/domain/gateway/video/video.gateway";

export type DeleteOneVideoInputDto = {
  filename: string;
};
export type DeleteOneVideoOutputDto = {
  body: string;
  statusCode: number;
};

export class DeleteOneVideoUsecase implements UseCase<DeleteOneVideoInputDto, DeleteOneVideoOutputDto> {
  private constructor(private readonly gateway: VideoGateway) {}

  public static create(gateway: VideoGateway) {
    return new DeleteOneVideoUsecase(gateway);
  }

  public async execute(input: DeleteOneVideoInputDto): Promise<DeleteOneVideoOutputDto> {
    try {
      const { body, statusCode } = await this.gateway.deleteOneVideo(input.filename);
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
