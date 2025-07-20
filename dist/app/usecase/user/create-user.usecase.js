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
exports.CreateUserUsecase = void 0;
const create_user_validation_1 = require("@/app/domain/entity/validation/user/create-user.validation");
const user_entity_1 = require("../../domain/entity/user/user.entity");
const create_user_presenter_1 = require("../../presenter/user/create-user.presenter");
class CreateUserUsecase {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    static create(userGateway) {
        return new CreateUserUsecase(userGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, phone, name } = input;
                const user = { phone, name, password };
                const validator = create_user_validation_1.CreateUserValidation.create();
                const aUser = user_entity_1.User.create(user, validator);
                const data = yield this.userGateway.create(aUser);
                const response = create_user_presenter_1.CreateUserPresenter.presenter(data);
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
exports.CreateUserUsecase = CreateUserUsecase;
