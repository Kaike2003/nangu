import { Router } from "express";
import { prisma } from "@/util/prisma/prisma";
import { CreateVideoUsecase } from "@/app/usecase/video/create-video.usecase";
import { CreateVideoController } from "../../controller/video/create-video.controller";
import { checkTotalVideoSize, uploadVideo } from "@/util/storage/video/video.storage";
import { VideoPrismaRepository } from "@/app/infra/repository/prisma/video/video.prisma.repository";
import { Auth } from "../../middleware/auth";

export class CreateVideoRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new CreateVideoRoute(app);
  }

  public async execute(): Promise<Router> {
    const repository = VideoPrismaRepository.create(prisma);
    const usecase = CreateVideoUsecase.create(repository);
    const controller = CreateVideoController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.post("/video", auth, uploadVideo, checkTotalVideoSize, controller);
  }
}
