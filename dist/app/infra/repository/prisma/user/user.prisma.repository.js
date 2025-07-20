"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaRepository = void 0;
const argon_encrypt_1 = require("@/util/encrypt/argon/argon.encrypt");
const shortId_util_1 = require("@/util/shortId/shortId.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    static create(prisma) {
        return new UserPrismaRepository(prisma);
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, phone, name, password } = user;
                const secret = shortId_util_1.ShortUniqueIdUtil.short(6);
                const hash = yield argon_encrypt_1.ArgonEncrypt.hash(password);
                const data = { phone, name, password: hash, secret };
                const existEmail = yield this.prisma.user.findUnique({ where: { phone } });
                if (existEmail) {
                    return {
                        body: "Esse número de telefone já está sendo usado",
                        statusCode: 400,
                    };
                }
                yield this.prisma.user.create({ data });
                /* await instance.post("/sendsms", {
                  contactNo: [`${phone}`],
                  message: `Olá, ${user.name}. Agradecemos por criar uma conta na Nangua! Conte com a gente para o que precisar — e, se puder, contribua compartilhando suas fotografias e vídeos. Aqui está o seu código de autenticação: ${secret}`,
                });
          */
                return {
                    body: "Usuario criado com sucesso ",
                    statusCode: 201,
                };
            }
            catch (error) {
                return {
                    body: error,
                    statusCode: 400,
                };
            }
        });
    }
    login(phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existPhone = yield this.prisma.user.findUnique({ where: { phone } });
                if (!(existPhone === null || existPhone === void 0 ? void 0 : existPhone.checked)) {
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
                const verifyPassword = yield argon_encrypt_1.ArgonEncrypt.verify(hash, aUser.password);
                if (!verifyPassword) {
                    return {
                        body: "Palavra passe incorreta!!! Tente novamente",
                        statusCode: 400,
                    };
                }
                const secret = process.env.SECRET;
                const payload = { id: existPhone.id, email: existPhone.phone };
                const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "1d" });
                return {
                    body: token,
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: error,
                    statusCode: 400,
                };
            }
        });
    }
    checked(secret) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existSecret = yield this.prisma.user.findUnique({
                    where: { secret },
                });
                if ((existSecret === null || existSecret === void 0 ? void 0 : existSecret.checked) === false) {
                    yield this.prisma.user.update({ where: { secret }, data: { checked: true } });
                    return {
                        body: "Sua conta foi autenticada com sucesso",
                        statusCode: 200,
                    };
                }
                if ((existSecret === null || existSecret === void 0 ? void 0 : existSecret.checked) === true) {
                    return {
                        body: "Sua conta já está autenticada",
                        statusCode: 200,
                    };
                }
                return { body: "Código secreto inválido, tente novamente", statusCode: 400 };
            }
            catch (error) {
                return {
                    body: error,
                    statusCode: 400,
                };
            }
        });
    }
    resetPassword(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existEmail = yield this.prisma.user.findUnique({
                    where: {
                        phone,
                    },
                });
                if (!(existEmail === null || existEmail === void 0 ? void 0 : existEmail.phone)) {
                    return {
                        body: "Número de telefone inválido",
                        statusCode: 400,
                    };
                }
                const newPassword = shortId_util_1.ShortUniqueIdUtil.short(10);
                /* await instance.post("/sendsms", {
                  contactNo: [`${phone}`],
                  message: `Olá, ${existEmail.name}. Agradecemos por criar uma conta na Nangua! Conte com a gente para o que precisar — e, se puder, contribua compartilhando suas fotografias e vídeos. Aqui está o seu código de autenticação: ${newPassword}`,
                });
          */
                yield this.prisma.user.update({
                    where: {
                        phone,
                    },
                    data: {
                        password: newPassword,
                    },
                });
                return {
                    body: "Palavra passe alterada com sucesso. Confira a sua caixa de mensagem " + newPassword,
                    statusCode: 200,
                };
            }
            catch (error) {
                return {
                    body: error,
                    statusCode: 400,
                };
            }
        });
    }
}
exports.UserPrismaRepository = UserPrismaRepository;
