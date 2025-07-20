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
exports.ResetPasswordUserUsecase = void 0;
const reset_password_user_presenter_1 = require("@/app/presenter/user/reset-password-user.presenter");
class ResetPasswordUserUsecase {
    constructor(gateway) {
        this.gateway = gateway;
    }
    static create(gateway) {
        return new ResetPasswordUserUsecase(gateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phone } = input;
                const data = yield this.gateway.resetPassword(phone);
                const response = reset_password_user_presenter_1.ResetPasswordUserPresenter.presenter(data);
                return response;
            }
            catch (error) {
                return {
                    body: error instanceof Error ? error.message : String(error),
                    statusCode: 404,
                };
            }
        });
    }
}
exports.ResetPasswordUserUsecase = ResetPasswordUserUsecase;
