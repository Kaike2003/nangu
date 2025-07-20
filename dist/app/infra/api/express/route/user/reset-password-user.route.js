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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUserRoute = void 0;
const user_prisma_repository_1 = require("@/app/infra/repository/prisma/user/user.prisma.repository");
const reset_password_user_uscase_1 = require("@/app/usecase/user/reset-password-user.uscase");
const prisma_1 = require("@/util/prisma/prisma");
const express_1 = require("express");
const reset_password_user_controller_1 = require("../../controller/user/reset-password-user.controller");
class ResetPasswordUserRoute {
    constructor(app) {
        this.app = app;
    }
    static create() {
        const app = (0, express_1.Router)();
        return new ResetPasswordUserRoute(app);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = user_prisma_repository_1.UserPrismaRepository.create(prisma_1.prisma);
            const usecase = reset_password_user_uscase_1.ResetPasswordUserUsecase.create(repository);
            const controller = yield reset_password_user_controller_1.ResetPasswordUserController.create(usecase).execute();
            return this.app.put("/user/reset-password", controller);
        });
    }
}
exports.ResetPasswordUserRoute = ResetPasswordUserRoute;
