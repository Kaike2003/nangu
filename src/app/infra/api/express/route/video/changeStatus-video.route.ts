import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { VideoPrismaRepository } from "@/app/infra/repository/prisma/video/video.prisma.repository";
import { ChangeStatusVideoUsecase } from "@/app/usecase/video/changeStatus-video.usecase";
import { ChangeStatusVideoController } from "../../controller/video/changeStatus-video.controller";
import { Auth } from "../../middleware/auth";

export class ChangeStatusVideoRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app: Router = Router();
    return new ChangeStatusVideoRoute(app);
  }

  public async execute() {
    const repository = VideoPrismaRepository.create(prisma);
    const usecase = ChangeStatusVideoUsecase.create(repository);
    const controller = ChangeStatusVideoController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.put("/video", auth, controller);
  }
}
