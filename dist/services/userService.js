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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.login = exports.register = void 0;
const UserRepositories = __importStar(require("../repositories/UserRepositories"));
const bcryptHash_1 = require("./bcryptHash");
const email_validator_1 = __importDefault(require("email-validator"));
const tokenHandler_1 = require("./tokenHandler");
const register = ({ email, password, fullName, passwordRepeat, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password || !fullName || !passwordRepeat) {
        throw new Error("Preencha todos os campos.");
    }
    if (password !== passwordRepeat) {
        throw new Error("Senhas não conferem.");
    }
    const checkEmail = yield email_validator_1.default.validate(email);
    if (!checkEmail) {
        throw new Error("E-mail inválido.");
    }
    const findUser = yield UserRepositories.findUserByEmail(email);
    if (findUser) {
        throw new Error("E-mail já cadastrado.");
    }
    const hashPassword = yield (0, bcryptHash_1.encryptHash)(password);
    const newUser = yield UserRepositories.createUser(email, hashPassword, fullName);
    return newUser;
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        throw new Error("Preencha todos os campos.");
    }
    const findUser = yield UserRepositories.findUserByEmail(email);
    if (!findUser) {
        throw new Error("Email ou Senha incorreta.");
    }
    const match = yield (0, bcryptHash_1.CompareHash)(password, findUser.password);
    if (!match) {
        throw new Error("Email ou Senha incorreta.");
    }
    const token = yield (0, tokenHandler_1.generateToken)(findUser.id, findUser.email);
    return { token, email: findUser.email, fullName: findUser.fullName };
});
exports.login = login;
const update = (newName, newPassword, password, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        throw new Error("Campo de senha antiga Obrigatório!");
    }
    const findUser = yield UserRepositories.findUserById(userId);
    if (!findUser) {
        throw new Error("Usuário não encontrado!");
    }
    const match = yield (0, bcryptHash_1.CompareHash)(password, findUser.password);
    if (!match) {
        throw new Error("Senha antiga incorreta!!");
    }
    if (newName) {
        yield UserRepositories.updateName(userId, newName);
    }
    if (newPassword) {
        const hashPassword = yield (0, bcryptHash_1.encryptHash)(newPassword);
        yield UserRepositories.updatePassword(userId, hashPassword);
    }
    return { message: "Usuário atualizado com sucesso! Você será Redirecionado", id: userId };
});
exports.update = update;
//# sourceMappingURL=userService.js.map