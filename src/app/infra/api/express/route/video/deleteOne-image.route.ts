import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { VideoPrismaRepository } from "@/app/infra/repository/prisma/video/video.prisma.repository";
import { DeleteOneVideoUsecase } from "@/app/usecase/video/deleteOne-image.usecase";
import { DeleteOneVideoController } from "../../controller/video/deleteOne-image.controller";
import { Auth } from "../../middleware/auth";

export class DeleteOneVideoRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new DeleteOneVideoRoute(app);
  }

  public async execute() {
    const repository = VideoPrismaRepository.create(prisma);
    const usecase = DeleteOneVideoUsecase.create(repository);
    const controller = DeleteOneVideoController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.delete("/video", auth, controller);
  }
}
