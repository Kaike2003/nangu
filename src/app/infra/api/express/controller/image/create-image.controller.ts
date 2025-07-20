import { TypeImage } from "@/app/domain/gateway/image/image.gateway";
import { CreateImageUsecase } from "@/app/usecase/image/create-image.usecase";
import { formatPhone } from "@/util/formatPhone/formatPhone";
import { prisma } from "@/util/prisma/prisma";
import { supabase } from "@/util/supabaseClient";
import { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";

export class CreateImageController {
  private constructor(private readonly usecase: CreateImageUsecase) {}

  public static create(usecase: CreateImageUsecase) {
    return new CreateImageController(usecase);
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

      const uploadedImages: TypeImage[] = [];

      for (const file of files) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;

        // Upload para Supabase Storage
        const { error } = await supabase.storage
          .from("user-uploads")
          .upload(`users/${phone}/${filename}`, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
          });

        if (error) {
          console.error(error);
          continue; // pula erro individual
        }

        const publicUrl = supabase.storage.from("user-uploads").getPublicUrl(`users/${phone}/${filename}`)
          .data.publicUrl;

        uploadedImages.push({
          filename: publicUrl,
          size: file.size,
          phone,
        });
      }

      const response = await this.usecase.execute({
        images: uploadedImages,
        phone,
      });

      res.status(200).json(response.body);
    };
  }
}
