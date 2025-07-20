import { Request, Response } from "express";
import path from "path";

export class DownloadVideoController {
  private constructor() {}

  public static create() {
    return new DownloadVideoController();
  }

  public execute() {
    return async (req: Request<{ filename: string }, {}, {}>, res: Response) => {
      try {
        const { filename } = req.params;

        const rootDir = process.cwd();
        const filePath = path.join(rootDir, "public", "uploads", "video", filename);

        res.download(filePath, filename);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
