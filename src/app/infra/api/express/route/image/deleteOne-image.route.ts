import { ImagePrismaRepository } from "@/app/infra/repository/prisma/image/image.prisma.repository";
import { CreateImageUsecase } from "@/app/usecase/image/create-image.usecase";
import { DeleteOneImageUsecase } from "@/app/usecase/image/deleteOne-image.usecase";
import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { DeleteOneImageController } from "../../controller/image/deleteOne-image.controller";
import { Auth } from "../../middleware/auth";

export class DeleteOneImageRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new DeleteOneImageRoute(app);
  }

  public async execute() {
    const repository = ImagePrismaRepository.create(prisma);
    const usecase = DeleteOneImageUsecase.create(repository);
    const controller = DeleteOneImageController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.delete("/image", auth, controller);
  }
}
