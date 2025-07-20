import { UserPrismaRepository } from "@/app/infra/repository/prisma/user/user.prisma.repository";
import { LoginUserUsecase } from "@/app/usecase/user/login-user.usecase";
import { prisma } from "@/util/prisma/prisma";
import { Request, Response, Router } from "express";
import { LoginUserController } from "../../controller/user/login-user.controller";

export class LoginUserRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new LoginUserRoute(app);
  }

  public async execute() {
    const repository = UserPrismaRepository.create(prisma);
    const usecase = LoginUserUsecase.create(repository);
    const controller = LoginUserController.create(usecase);
    return this.app.post("/user/login", await controller.execute());
  }
}
