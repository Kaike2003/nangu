"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortUniqueIdUtil = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
class ShortUniqueIdUtil {
    constructor() { }
    static short(length) {
        const { randomUUID } = new short_unique_id_1.default({ length });
        return randomUUID();
    }
}
exports.ShortUniqueIdUtil = ShortUniqueIdUtil;
