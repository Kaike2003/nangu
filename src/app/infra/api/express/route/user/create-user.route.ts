import { Router } from "express";
import { CreateUserController } from "../../controller/user/create-user.controller";
import { UserPrismaRepository } from "@/app/infra/repository/prisma/user/user.prisma.repository";
import { prisma } from "@/util/prisma/prisma";
import { CreateUserUsecase } from "@/app/usecase/user/create-user.usecase";

export class CreateUserRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new CreateUserRoute(app);
  }

  public async execute() {
    const repository = UserPrismaRepository.create(prisma);
    const usecase = CreateUserUsecase.create(repository);
    const controller = CreateUserController.create(usecase);
    return this.app.post("/user", await controller.execute());
  }
}
