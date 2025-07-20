import { UserPrismaRepository } from "@/app/infra/repository/prisma/user/user.prisma.repository";
import { ResetPasswordUserUsecase } from "@/app/usecase/user/reset-password-user.uscase";
import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { ResetPasswordUserController } from "../../controller/user/reset-password-user.controller";

export class ResetPasswordUserRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new ResetPasswordUserRoute(app);
  }

  public async execute() {
    const repository = UserPrismaRepository.create(prisma);
    const usecase = ResetPasswordUserUsecase.create(repository);
    const controller = await ResetPasswordUserController.create(usecase).execute();
    return this.app.put("/user/reset-password", controller);
  }
}
