import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { VideoPrismaRepository } from "@/app/infra/repository/prisma/video/video.prisma.repository";
import { GetAllVideoUsecase } from "@/app/usecase/video/getAll-video.usecase";
import { GetAllVideoController } from "../../controller/video/getAll-video.controller";
import { Auth } from "../../middleware/auth";

export class GetAllVideoRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new GetAllVideoRoute(app);
  }

  public async execute() {
    const repository = VideoPrismaRepository.create(prisma);
    const useCase = GetAllVideoUsecase.create(repository);
    const controller = GetAllVideoController.create(useCase).excute();
    const auth = Auth.create().execute();
    return this.app.get("/video", auth, controller);
  }
}
