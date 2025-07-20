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
exports.CheckedUserController = void 0;
const checked_user_presenter_1 = require("@/app/presenter/user/checked.user.presenter");
class CheckedUserController {
    constructor(usecase) {
        this.usecase = usecase;
    }
    static create(usecase) {
        return new CheckedUserController(usecase);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            return (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { secret } = req.body;
                    const aUser = { secret };
                    const data = yield this.usecase.execute(aUser);
                    const presenter = checked_user_presenter_1.CheckedUserPresenter.presenter(data);
                    res.status(presenter.statusCode).json(presenter.body);
                }
                catch (error) {
                    res.status(400).json(error instanceof Error ? error.message : String(error));
                }
            });
        });
    }
}
exports.CheckedUserController = CheckedUserController;
