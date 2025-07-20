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
exports.ExpressInfra = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const create_user_route_1 = require("./route/user/create-user.route");
const login_user_route_1 = require("./route/user/login-user.route");
const checked_user_route_1 = require("./route/user/checked-user.route");
const reset_password_user_route_1 = require("./route/user/reset-password-user.route");
const create_media_route_1 = require("./route/media/create-media.route");
class ExpressInfra {
    constructor(app) {
        this.app = app;
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = (0, express_1.default)();
            const version = "/v1/";
            app
                .use(express_1.default.json({ limit: "1mb" }))
                .use(express_1.default.urlencoded({ extended: true, limit: "1mb" }))
                .use((0, cors_1.default)())
                .use((0, morgan_1.default)("dev"));
            const createUserRoute = yield create_user_route_1.CreateUserRoute.create().execute();
            const loginUserRoute = yield login_user_route_1.LoginUserRoute.create().execute();
            const checkedUserRoute = yield checked_user_route_1.CheckedUserRoute.create().execute();
            const resetPasswordUserRoute = yield reset_password_user_route_1.ResetPasswordUserRoute.create().execute();
            app.use(version, createUserRoute, loginUserRoute, checkedUserRoute, resetPasswordUserRoute);
            const createMediaRoute = yield create_media_route_1.CreateMediaRoute.create().execute();
            app.use(version, createMediaRoute);
            return new ExpressInfra(app);
        });
    }
    listen(port) {
        this.app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
    }
}
exports.ExpressInfra = ExpressInfra;
