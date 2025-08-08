import { User } from "@/app/domain/entity/user/user.entity";
import { UserGateway } from "@/app/domain/gateway/user/user.gateway";
import { PrismaClient, Role } from "@/generated/prisma";
import instance from "@/util/axios/api.axios";
import { ArgonEncrypt } from "@/util/encrypt/argon/argon.encrypt";
import { removeSpace } from "@/util/removeSpace/removeSpace";
import { IResponse } from "@/util/response/response";
import { ShortUniqueIdUtil } from "@/util/shortId/shortId.util";
import jwt from "jsonwebtoken";

export class UserPrismaRepository implements UserGateway {
  private constructor(private readonly prisma: PrismaClient) { }

  public static create(prisma: PrismaClient) {
    return new UserPrismaRepository(prisma);
  }

  public async create(
    user: User
  ): Promise<IResponse<number, { id: string; name: string; phone: string; role: Role } | string>> {
    try {
      const { id, phone, name, password, role } = user;
      const secret = ShortUniqueIdUtil.short(6);
      const hash = await ArgonEncrypt.hash(password);
      const data = { phone, name, password: hash, secret, checked: true, role };
      const existEmail = await this.prisma.user.findUnique({ where: { phone } });

      if (existEmail) {
        return {
          body: "Esse número de telefone já está sendo usado",
          statusCode: 400,
        };
      }

      const res = await this.prisma.user.create({ data });

      await instance.post("/sendsms", {

        contactNo: [`${phone}`],
        message: `Olá,

Foi convidado(a) para o casamento de Lucinda Gaspar Bartolomeu e Délcio da Silva Mangueira.

A sua conta foi criada na plataforma Nangu!
Estamos muito felizes por tê-lo(a) connosco.
Aproveite para partilhar as suas melhores fotografias e vídeos desta celebração inesquecível.

As suas credenciais de acesso:

Telefone: ${user.phone.replace(/^244/, "")}
Senha: ${user.password}

Acesse agora o app e comece sua jornada:
https://www.nangu.digital/login/user
ou
https://nangu.digital/login/user

A aplicação dar-lhe-á acesso:
📍 à localização do evento
🍽 ao cardápio do casamento
📸 à galeria multimédia (fotografias e vídeos) da cerimónia e festa

Bem-vindo(a) à família Nangu!`,
      });

      return {
        body: {
          id: res.id,
          name: res.name,
          phone: res.phone,
          role: res.role,
        },
        statusCode: 201,
      };
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }

  public async login(
    phone: string,
    password: string
  ): Promise<
    IResponse<
      number,
      | {
        user: { id: string; name: string; phone: string; role: "user" };
        token: string;
      }
      | string
    >
  > {
    try {
      const existPhone = await this.prisma.user.findUnique({ where: { phone } });

      if (!existPhone?.checked) {
        return {
          body: "Autentique sua conta primeiro",
          statusCode: 400,
        };
      }

      if (!existPhone) {
        return {
          body: "Número de telefone inválido, use um número correto",
          statusCode: 400,
        };
      }
      const aUser = { phone, password };

      const hash = existPhone.password;
      const verifyPassword = await ArgonEncrypt.verify(hash, aUser.password);

      if (!verifyPassword) {
        return {
          body: "Palavra passe incorreta!!! Tente novamente",
          statusCode: 400,
        };
      }

      const secret = process.env.SECRET as string;
      const payload = { id: existPhone.id, email: existPhone.phone };
      const token = jwt.sign(payload, secret, { expiresIn: "1d" });

      return {
        body: {
          user: {
            id: existPhone.id,
            name: existPhone.name,
            phone: existPhone.phone,
            role: "user",
          },
          token,
        },
        statusCode: 200,
      };
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }

  public async checked(secret: string): Promise<IResponse<number, string>> {
    try {
      const existSecret = await this.prisma.user.findUnique({
        where: { secret },
      });

      if (existSecret?.checked === false) {
        await this.prisma.user.update({ where: { secret }, data: { checked: true } });
        return {
          body: "Sua conta foi autenticada com sucesso",
          statusCode: 200,
        };
      }

      if (existSecret?.checked === true) {
        return {
          body: "Sua conta já está autenticada",
          statusCode: 200,
        };
      }

      return { body: "Código secreto inválido, tente novamente", statusCode: 400 };
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }

  public async resetPassword(phone: string): Promise<IResponse<number, string>> {
    try {
      const existEmail = await this.prisma.user.findUnique({
        where: {
          phone,
        },
      });

      if (!existEmail?.phone) {
        return {
          body: "Número de telefone inválido",
          statusCode: 400,
        };
      }
      const newPassword = ShortUniqueIdUtil.short(10);

      /* await instance.post("/sendsms", {
        contactNo: [`${phone}`],
        message: `Olá, ${existEmail.name}. Agradecemos por criar uma conta na Nangua! Conte com a gente para o que precisar — e, se puder, contribua compartilhando suas fotografias e vídeos. Aqui está o seu código de autenticação: ${newPassword}`,
      });
*/

      await this.prisma.user.update({
        where: {
          phone: phone,
        },
        data: {
          password: newPassword,
        },
      });

      return {
        body: "Palavra passe alterada com sucesso. Confira a sua caixa de mensagem " + newPassword,
        statusCode: 200,
      };
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }

  public async changeProfile(name: string, newPhone: string, oldPhone: string): Promise<IResponse<number, string>> {
    try {
      const existOldPhone = await this.prisma.user.findUnique({
        where: {
          phone: oldPhone,
        },
      });

      if (!existOldPhone) {
        return {
          statusCode: 404,
          body: "Numero inválido",
        };
      }

      if (existOldPhone.phone === newPhone) {
        await this.prisma.user.update({
          where: {
            phone: existOldPhone.phone,
          },
          data: {
            name: name,
          },
        });

        return {
          statusCode: 200,
          body: "Infomacões atualizadas com sucesso.",
        };
      }

      await this.prisma.user.update({
        where: {
          phone: existOldPhone.phone,
        },
        data: {
          name,
          phone: newPhone,
        },
      });

      return {
        statusCode: 200,
        body: "Infomacões atualizadas com sucesso.",
      };
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }

  public async changePassword(
    newPassword: string,
    oldPassword: string,
    phone: string
  ): Promise<IResponse<number, string>> {
    try {
      const existPhone = await this.prisma.user.findUnique({ where: { phone } });
      const hash = await ArgonEncrypt.hash(newPassword);

      if (existPhone) {
        const password = await ArgonEncrypt.verify(existPhone.password, oldPassword);

        if (password === false) {
          return {
            body: "Password incorreta",
            statusCode: 400,
          };
        }

        await this.prisma.user.update({
          where: {
            phone,
          },
          data: {
            password: hash,
          },
        });

        return {
          body: "Password atualizada com sucesso",
          statusCode: 200,
        };
      }

      return {
        body: "Número de telefone inválido.",
        statusCode: 400,
      };
    } catch (error) {
      return {
        body: error as string,
        statusCode: 400,
      };
    }
  }
}
