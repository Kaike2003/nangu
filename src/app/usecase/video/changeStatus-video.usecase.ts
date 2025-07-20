import { UseCase } from "../usecase";
import { VideoGateway } from "@/app/domain/gateway/video/video.gateway";

export type ChangeStatusVideoInput = {
  filename: string;
};
export type ChangeStatusVideoOutput = {
  body: string;
  statusCode: number;
};

export class ChangeStatusVideoUsecase implements UseCase<ChangeStatusVideoInput, ChangeStatusVideoOutput> {
  private constructor(private readonly gateway: VideoGateway) {}

  public static create(gateway: VideoGateway) {
    return new ChangeStatusVideoUsecase(gateway);
  }

  public async execute(input: ChangeStatusVideoInput): Promise<ChangeStatusVideoOutput> {
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
