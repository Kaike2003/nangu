"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckedUserPresenter = void 0;
class CheckedUserPresenter {
    constructor() { }
    static presenter(output) {
        return {
            statusCode: output.statusCode,
            body: output.body,
        };
    }
}
exports.CheckedUserPresenter = CheckedUserPresenter;
