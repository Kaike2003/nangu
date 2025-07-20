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
exports.CreateUserController = void 0;
const create_user_presenter_1 = require("@/app/presenter/user/create-user.presenter");
class CreateUserController {
    constructor(usecase) {
        this.usecase = usecase;
    }
    static create(usecase) {
        return new CreateUserController(usecase);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            return (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { name, phone, password } = req.body;
                    const aUser = { name, phone, password, id: "" };
                    const data = yield this.usecase.execute(aUser);
                    const presenter = create_user_presenter_1.CreateUserPresenter.presenter(data);
                    res.status(presenter.statusCode).json(presenter.body);
                }
                catch (error) {
                    res.status(400).json(error instanceof Error ? error.message : String(error));
                }
            });
        });
    }
}
exports.CreateUserController = CreateUserController;
