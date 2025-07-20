import { Request, Response } from "express";
import path from "path";

export class DownloadImageController {
  private constructor() {}

  public static create() {
    return new DownloadImageController();
  }

  public execute() {
    return async (req: Request<{ filename: string }, {}, {}>, res: Response) => {
      try {
        const { filename } = req.params;

        const rootDir = process.cwd();
        const filePath = path.join(rootDir, "public", "uploads", "image", filename);

        res.download(filePath, filename);
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}
