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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaRoute = void 0;
const express_1 = require("express");
const create_media_controller_1 = require("../../controller/media/create-media.controller");
const multer_1 = __importDefault(require("multer"));
class CreateMediaRoute {
    constructor(app) {
        this.app = app;
    }
    static create() {
        const app = (0, express_1.Router)();
        return new CreateMediaRoute(app);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const upload = (0, multer_1.default)({ dest: "/public/uploads" });
            const controller = create_media_controller_1.CreateMediaController.create().execute();
            return this.app.post("/media", upload.single("data"), controller);
        });
    }
}
exports.CreateMediaRoute = CreateMediaRoute;
