import { TypeVideo } from "@/app/domain/gateway/video/video.gateway";
import { CreateVideoUsecase } from "@/app/usecase/video/create-video.usecase";
import { formatPhone } from "@/util/formatPhone/formatPhone";
import { prisma } from "@/util/prisma/prisma";
import { supabase } from "@/util/supabaseClient";
import { Request, RequestHandler, Response } from "express";
import path from "path";

export class CreateVideoController {
  private constructor(private readonly usecase: CreateVideoUsecase) {}

  public static create(usecase: CreateVideoUsecase) {
    return new CreateVideoController(usecase);
  }

  public execute() {
    return async (req: Request, res: Response) => {
      const phone = formatPhone(req.headers["user-phone"] as string);
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];

      if (!phone) {
        res.status(400).json("Telefone inválido");
        return;
      }

      const user = await prisma.user.findUnique({ where: { phone } });

      if (!user) {
        res.status(404).json("Usuário não encontrado");
        return;
      }

      const uploadedVideos: TypeVideo[] = [];

      for (const file of files) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        const fullPath = `users/${phone}/${filename}`;

        // Upload para Supabase Storage
        const { error } = await supabase.storage.from("user-uploads").upload(fullPath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

        if (error) {
          console.error("Erro no upload de vídeo:", error);
          continue; // ignora este arquivo e segue para o próximo
        }

        // Gera a URL pública completa
        const publicUrl = supabase.storage.from("user-uploads").getPublicUrl(fullPath).data.publicUrl;

        uploadedVideos.push({
          filename: publicUrl,
          size: file.size,
          phone,
        });
      }

      const response = await this.usecase.execute({
        video: uploadedVideos,
        phone,
      });

      res.status(200).json(response.body);
      return;
    };
  }
}
