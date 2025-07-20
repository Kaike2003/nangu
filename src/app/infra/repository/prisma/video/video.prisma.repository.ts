import { TypeVideo, VideoGateway } from "@/app/domain/gateway/video/video.gateway";
import { PrismaClient } from "@/generated/prisma";
import { IResponse } from "@/util/response/response";
import { supabase } from "@/util/supabaseClient";
import * as fs from "fs";
import * as path from "path";

export class VideoPrismaRepository implements VideoGateway {
  private constructor(private readonly prisma: PrismaClient) {}

  public static create(prisma: PrismaClient) {
    return new VideoPrismaRepository(prisma);
  }

  public async create(video: TypeVideo[], phone: string): Promise<IResponse<number, string>> {
    const userExisted = await this.prisma.user.findUnique({ where: { phone } });

    if (!userExisted) {
      return {
        body: "Usuário não existe",
        statusCode: 404,
      };
    }

    const data = await this.prisma.video.createMany({
      data: video,
    });

    return {
      body: "Videos carregados com sucesso.",
      statusCode: 201,
    };
  }

  public async getAllVideo(): Promise<IResponse<number, TypeVideo[] | string>> {
    try {
      const videos = await this.prisma.video.findMany({
        include: {
          User: {
            select: { name: true },
          },
        },
        orderBy: {
          createAt: "desc",
        },
      });

      const data: TypeVideo[] = videos.map((p) => ({
        phone: p.phone as string,
        size: p.size,
        filename: p.filename, // já deve ser a URL pública
        user: p.User,
        published: p.published,
        createAt: p.createAt,
      }));

      return {
        body: data,
        statusCode: 200,
      };
    } catch (error) {
      console.error("Erro ao buscar videos:", error);
      return {
        body: "Erro ao buscar videos",
        statusCode: 400,
      };
    }
  }

  public async deleteOneVideo(filename: string): Promise<IResponse<number, string>> {
    try {
      const filenameExisted = await this.prisma.video.findFirst({ where: { filename } });

      if (!filenameExisted) {
        return {
          body: "Video não encontrada no banco de dados",
          statusCode: 404,
        };
      }

      // Remove do Supabase Storage
      const { error } = await supabase.storage
        .from("user-uploads") // nome do bucket
        .remove([filenameExisted.filename]); // caminho completo no bucket

      if (error) {
        console.error("Erro ao deletar no Supabase Storage:", error.message);
        return {
          body: "Erro ao deletar video do Supabase",
          statusCode: 500,
        };
      }

      // Remove do banco de dados
      await this.prisma.video.delete({
        where: { id: filenameExisted.id },
      });

      return {
        body: "Video deletada com sucesso.",
        statusCode: 200,
      };
    } catch (error) {
      return {
        body: error instanceof Error ? error.message : String(error),
        statusCode: 400,
      };
    }
  }

  public async changeStatus(filename: string): Promise<IResponse<number, string>> {
    try {
      const filenameExisted = await this.prisma.video.findFirst({ where: { filename } });

      if (filenameExisted) {
        if (filenameExisted.published === true) {
          await this.prisma.video.update({
            where: {
              id: filenameExisted.id,
            },
            data: {
              published: false,
            },
          });

          return {
            body: "Status da video alterado false",
            statusCode: 200,
          };
        } else {
          await this.prisma.video.update({
            where: {
              id: filenameExisted.id,
            },
            data: {
              published: true,
            },
          });

          return {
            body: "Status da video alterado true",
            statusCode: 200,
          };
        }
      }

      return {
        body: "Erro ao mudar o status da video",
        statusCode: 400,
      };
    } catch (error) {
      return {
        body: error instanceof Error ? error.message : String(error),
        statusCode: 400,
      };
    }
  }
}
