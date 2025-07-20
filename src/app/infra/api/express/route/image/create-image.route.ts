import { Router } from "express";
import { CreateImageController } from "../../controller/image/create-image.controller";
import { uploadImage } from "@/util/storage/image/image.storage";
import { CreateImageUsecase } from "@/app/usecase/image/create-image.usecase";
import { ImagePrismaRepository } from "@/app/infra/repository/prisma/image/image.prisma.repository";
import { prisma } from "@/util/prisma/prisma";
import { Auth } from "../../middleware/auth";

export class CreateImageRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new CreateImageRoute(app);
  }

  public async execute(): Promise<Router> {
    const repository = ImagePrismaRepository.create(prisma);
    const usecase = CreateImageUsecase.create(repository);
    const controller = CreateImageController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.post("/image", auth, uploadImage, controller);
  }
}
