import { UserPrismaRepository } from "@/app/infra/repository/prisma/user/user.prisma.repository";
import { ChangePasswordUserUsecase } from "@/app/usecase/user/changePassword-user.usecase";
import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { ChangePasswordUserController } from "../../controller/user/changePassword-user.controller";
import { Auth } from "../../middleware/auth";

export class ChangePasswordUserRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new ChangePasswordUserRoute(app);
  }

  public async execute() {
    const repository = UserPrismaRepository.create(prisma);
    const usecase = ChangePasswordUserUsecase.create(repository);
    const controller = await ChangePasswordUserController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.put("/user/password", auth, controller);
  }
}
