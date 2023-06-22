"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.update = exports.access = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const UserServices = __importStar(require("../services/UserServices"));
// Função para lidar com o registro de novos usuários
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullName, passwordRepeat } = req.body;
    try {
        const result = yield UserServices.register({
            email,
            password,
            fullName,
            passwordRepeat,
        });
        return res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
// fução para lidar com a autenticação do usuário.
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield UserServices.login(email, password);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
// função para, assim que autenticado, dar acesso ao usuário.
const access = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield User_1.User.findAll();
        let list = [];
        for (let i in users) {
            list.push(users[i].fullName);
        }
        return res.json({ list });
    }
    catch (error) {
        next(error);
    }
});
exports.access = access;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newName, newPassword, password } = req.body;
    const { userId } = req;
    console.log(userId);
    try {
        const result = yield UserServices.update(newName, newPassword, password, userId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
//# sourceMappingURL=apiController.js.map