"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserValidation = void 0;
const email_regex_1 = require("@/util/regex/email/email.regex");
class CreateUserValidation {
    constructor() { }
    static create() {
        return new CreateUserValidation();
    }
    validate(input) {
        const found = email_regex_1.phoneProviderRegexes.find(({ regex }) => regex.test(input.phone));
        if (!input.name || typeof input.name !== "string") {
            throw new Error("Nome inválido");
        }
        if (input.name.length <= 4) {
            throw new Error("O nome deve ter mais de 5 caracteres");
        }
        if (input.name.length >= 30) {
            throw new Error("O nome deve ter menos de 30 caracteres");
        }
        if (!input.password || typeof input.password !== "string") {
            throw new Error("A palavra passe inválida");
        }
        if (input.password.length <= 4) {
            throw new Error("A palavra passe deve ter mais de 5 caracteres");
        }
        if (input.password.length >= 30) {
            throw new Error("A palavra passe deve ter menos de 30 caracteres");
        }
        if (!found) {
            throw new Error("Provedor desconhecido ou não suportado.");
        }
    }
}
exports.CreateUserValidation = CreateUserValidation;
