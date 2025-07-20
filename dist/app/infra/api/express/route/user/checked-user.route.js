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
exports.CheckedUserRoute = void 0;
const user_prisma_repository_1 = require("@/app/infra/repository/prisma/user/user.prisma.repository");
const checked_user_usecase_1 = require("@/app/usecase/user/checked-user.usecase");
const prisma_1 = require("@/util/prisma/prisma");
const express_1 = require("express");
const checked_user_controller_1 = require("../../controller/user/checked-user.controller");
class CheckedUserRoute {
    constructor(app) {
        this.app = app;
    }
    static create() {
        const app = (0, express_1.Router)();
        return new CheckedUserRoute(app);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = user_prisma_repository_1.UserPrismaRepository.create(prisma_1.prisma);
            const usecase = checked_user_usecase_1.CheckedUserUsecase.create(repository);
            const controller = checked_user_controller_1.CheckedUserController.create(usecase);
            return this.app.put("/user/checked", yield controller.execute());
        });
    }
}
exports.CheckedUserRoute = CheckedUserRoute;
