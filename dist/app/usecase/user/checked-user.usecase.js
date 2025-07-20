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
exports.CheckedUserUsecase = void 0;
const checked_user_presenter_1 = require("@/app/presenter/user/checked.user.presenter");
class CheckedUserUsecase {
    constructor(gateway) {
        this.gateway = gateway;
    }
    static create(gateway) {
        return new CheckedUserUsecase(gateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { secret } = input;
                const data = yield this.gateway.checked(secret);
                const response = checked_user_presenter_1.CheckedUserPresenter.presenter(data);
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
exports.CheckedUserUsecase = CheckedUserUsecase;
