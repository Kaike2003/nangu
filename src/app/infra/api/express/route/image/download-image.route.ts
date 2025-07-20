import { Router } from "express";
import { DownloadImageController } from "../../controller/image/download-image.controller";

export class DownloadImageRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new DownloadImageRoute(app);
  }

  public async execute() {
    const controller = DownloadImageController.create().execute();

    return this.app.get("/download-image/:filename", controller);
  }
}
