import { ImagePrismaRepository } from "@/app/infra/repository/prisma/image/image.prisma.repository";
import { ChangeStatusImageUsecase } from "@/app/usecase/image/changeStatus-image.usecase";
import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { ChangeStatusImageController } from "../../controller/image/changeStatus-image.controller";
import { Auth } from "../../middleware/auth";

export class ChangeStatusImageRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app: Router = Router();
    return new ChangeStatusImageRoute(app);
  }

  public async execute() {
    const repository = ImagePrismaRepository.create(prisma);
    const usecase = ChangeStatusImageUsecase.create(repository);
    const controller = ChangeStatusImageController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.put("/image", auth, controller);
  }
}
