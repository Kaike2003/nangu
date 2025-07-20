import { UserPrismaRepository } from "@/app/infra/repository/prisma/user/user.prisma.repository";
import { CheckedUserUsecase } from "@/app/usecase/user/checked-user.usecase";
import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { CheckedUserController } from "../../controller/user/checked-user.controller";

export class CheckedUserRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new CheckedUserRoute(app);
  }

  public async execute() {
    const repository = UserPrismaRepository.create(prisma);
    const usecase = CheckedUserUsecase.create(repository);
    const controller = CheckedUserController.create(usecase);
    return this.app.put("/user/checked", await controller.execute());
  }
}
