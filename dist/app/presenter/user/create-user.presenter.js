"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserPresenter = void 0;
class CreateUserPresenter {
    constructor() { }
    static presenter(output) {
        return {
            statusCode: output.statusCode,
            body: output.body,
        };
    }
}
exports.CreateUserPresenter = CreateUserPresenter;
