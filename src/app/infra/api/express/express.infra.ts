import { Api } from "../api";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { CreateUserRoute } from "./route/user/create-user.route";
import { LoginUserRoute } from "./route/user/login-user.route";
import { CheckedUserRoute } from "./route/user/checked-user.route";
import { ResetPasswordUserRoute } from "./route/user/reset-password-user.route";
import { CreateImageRoute } from "./route/image/create-image.route";
import { CreateVideoRoute } from "./route/video/create-video.route";
import { GetAllImageRoute } from "./route/image/getAll-image.route";
import { GetAllVideoRoute } from "./route/video/getAll-video.route";
import { DownloadVideoRoute } from "./route/video/download-image.route";
import { DeleteOneImageRoute } from "./route/image/deleteOne-image.route";
import { DeleteOneVideoRoute } from "./route/video/deleteOne-image.route";
import { ChangeStatusImageRoute } from "./route/image/changeStatus-image.route";
import { ChangeStatusVideoRoute } from "./route/video/changeStatus-video.route";
import { ChangeProfileUserRoute } from "./route/user/changeProfile-user.route";
import { ChangePasswordUserRoute } from "./route/user/changePassword-user.route";

export class ExpressInfra implements Api {
  private constructor(private readonly app: Application) {}

  public static async create() {
    const app = express();
    const version: string = "/v1/";

    app
      .use(express.json({ limit: "1mb" }))
      .use(express.urlencoded({ extended: true, limit: "1mb" }))
      .use(cors())
      .use(morgan("dev"))
      .use("/public", express.static("public"));

    const createUserRoute = await CreateUserRoute.create().execute();
    const loginUserRoute = await LoginUserRoute.create().execute();
    const checkedUserRoute = await CheckedUserRoute.create().execute();
    const resetPasswordUserRoute = await ResetPasswordUserRoute.create().execute();
    const changeProfileUserRoute = await ChangeProfileUserRoute.create().execute();
    const changePasswordUserRoute = await ChangePasswordUserRoute.create().execute();
    app.use(
      version,
      createUserRoute,
      loginUserRoute,
      checkedUserRoute,
      resetPasswordUserRoute,
      changeProfileUserRoute,
      changePasswordUserRoute
    );

    const createImageRoute = await CreateImageRoute.create().execute();
    const getAllImageRoute = await GetAllImageRoute.create().execute();
    const deleteOneImageRoute = await DeleteOneImageRoute.create().execute();
    const changeStatusImageRoute = await ChangeStatusImageRoute.create().execute();

    app.use(
      version,
      createImageRoute,
      getAllImageRoute,
      deleteOneImageRoute,
      changeStatusImageRoute
    );

    const createVideoRoute = await CreateVideoRoute.create().execute();
    const getAllVideoRoute = await GetAllVideoRoute.create().execute();
    const downloadVideoRoute = await DownloadVideoRoute.create().execute();
    const deleteOneVideoRoute = await DeleteOneVideoRoute.create().execute();
    const changeStatusVideoRoute = await ChangeStatusVideoRoute.create().execute();

    app.use(
      version,
      createVideoRoute,
      getAllVideoRoute,
      downloadVideoRoute,
      deleteOneVideoRoute,
      changeStatusVideoRoute
    );

    return new ExpressInfra(app);
  }

  public listen(port: number): void {
    this.app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  }
}
