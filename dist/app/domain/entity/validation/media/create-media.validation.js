"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaValidation = void 0;
class CreateMediaValidation {
    constructor() { }
    static create() {
        return new CreateMediaValidation();
    }
    validate(input) {
        const { image, video, userId } = input;
        if (!userId || typeof userId !== "string") {
            throw new Error("Id do usuário inválido");
        }
        if (!image || (typeof image !== "string" && !Array.isArray(image))) {
            throw new Error("Imagem inválida");
        }
        if (!video || (typeof video !== "string" && !Array.isArray(video))) {
            throw new Error("Video inválido");
        }
    }
}
exports.CreateMediaValidation = CreateMediaValidation;
