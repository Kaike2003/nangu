"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDecoval = void 0;
const decoval_1 = require("decoval");
class LoginUserDecoval {
}
exports.LoginUserDecoval = LoginUserDecoval;
__decorate([
    (0, decoval_1.DvText)({ regex: { value: [/^\+2449\d{8}$/] } }),
    __metadata("design:type", String)
], LoginUserDecoval.prototype, "phone", void 0);
__decorate([
    (0, decoval_1.DvText)({ noSpaces: true, number: true, specialChar: true }),
    __metadata("design:type", String)
], LoginUserDecoval.prototype, "password", void 0);
