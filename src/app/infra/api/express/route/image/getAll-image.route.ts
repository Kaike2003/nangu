import { ImagePrismaRepository } from "@/app/infra/repository/prisma/image/image.prisma.repository";
import { GetAllImageUsecase } from "@/app/usecase/image/getAll-image.usecase";
import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { GetAllImageController } from "../../controller/image/getAll-image.controller";
import { Auth } from "../../middleware/auth";

export class GetAllImageRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new GetAllImageRoute(app);
  }

  public async execute() {
    const repository = ImagePrismaRepository.create(prisma);
    const useCase = GetAllImageUsecase.create(repository);
    const controller = GetAllImageController.create(useCase).excute();
    const auth = Auth.create().execute();
    return this.app.get("/image", auth, controller);
  }
}
