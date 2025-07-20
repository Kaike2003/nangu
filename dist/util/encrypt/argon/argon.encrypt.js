"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgonEncrypt = void 0;
const argon2_1 = __importDefault(require("argon2"));
class ArgonEncrypt {
    constructor() { }
    static hash(password) {
        const hash = argon2_1.default.hash(password);
        return hash;
    }
    static verify(hash, password) {
        const verify = argon2_1.default.verify(hash, password);
        return verify;
    }
}
exports.ArgonEncrypt = ArgonEncrypt;
