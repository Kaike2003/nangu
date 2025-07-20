import { UserPrismaRepository } from "@/app/infra/repository/prisma/user/user.prisma.repository";
import { ChangeProfileUserUsecase } from "@/app/usecase/user/changeProfile-user.usecase";
import { prisma } from "@/util/prisma/prisma";
import { Router } from "express";
import { ChangeProfileUserController } from "../../controller/user/changeProfile-user.controller";
import { Auth } from "../../middleware/auth";

export class ChangeProfileUserRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new ChangeProfileUserRoute(app);
  }

  public async execute() {
    const repository = UserPrismaRepository.create(prisma);
    const usecase = ChangeProfileUserUsecase.create(repository);
    const controller = await ChangeProfileUserController.create(usecase).execute();
    const auth = Auth.create().execute();
    return this.app.put("/user", auth, controller);
  }
}
