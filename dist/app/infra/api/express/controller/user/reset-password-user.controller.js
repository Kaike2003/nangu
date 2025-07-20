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
exports.ResetPasswordUserController = void 0;
const reset_password_user_presenter_1 = require("@/app/presenter/user/reset-password-user.presenter");
const express_1 = require("express");
class ResetPasswordUserController {
    constructor(usecase) {
        this.usecase = usecase;
    }
    static create(usecase) {
        return new ResetPasswordUserController(usecase);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            return (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { phone } = req.body;
                    const aUser = { phone };
                    const data = yield this.usecase.execute(aUser);
                    const presenter = yield reset_password_user_presenter_1.ResetPasswordUserPresenter.presenter(data);
                    res.status(presenter.statusCode).json(presenter.body);
                }
                catch (error) {
                    express_1.response.status(400).json(error);
                }
            });
        });
    }
}
exports.ResetPasswordUserController = ResetPasswordUserController;
