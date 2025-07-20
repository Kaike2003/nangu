import { Router } from "express";
import { DownloadImageController } from "../../controller/image/download-image.controller";
import { DownloadVideoController } from "../../controller/video/download-video.controller";

export class DownloadVideoRoute {
  private constructor(private readonly app: Router) {}

  public static create() {
    const app = Router();
    return new DownloadVideoRoute(app);
  }

  public async execute() {
    const controller = DownloadVideoController.create().execute();

    return this.app.get("/download-video/:filename", controller);
  }
}
