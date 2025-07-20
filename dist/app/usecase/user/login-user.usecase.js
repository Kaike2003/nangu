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
exports.LoginUserUsecase = void 0;
const login_user_presenter_1 = require("@/app/presenter/user/login-user.presenter");
class LoginUserUsecase {
    constructor(gateway) {
        this.gateway = gateway;
    }
    static create(gateway) {
        return new LoginUserUsecase(gateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, phone } = input;
                const data = yield this.gateway.login(phone, password);
                const response = yield login_user_presenter_1.LoginPresenter.presenter(data);
                return response;
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
exports.LoginUserUsecase = LoginUserUsecase;
