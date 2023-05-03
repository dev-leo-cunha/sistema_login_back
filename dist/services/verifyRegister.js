"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegister = void 0;
const email_validator_1 = __importDefault(require("email-validator"));
const verifyRegister = (email, password, passwordRepeat) => {
    let error = '';
    if (!email_validator_1.default.validate(email)) {
        return error = 'Email Inválido';
    }
    if (password !== passwordRepeat) {
        return error = 'As Senhas não conferem!';
    }
    if (password.length <= 3 || passwordRepeat.length <= 3) {
        return error = 'Senha Fraca!';
    }
    return true;
};
exports.verifyRegister = verifyRegister;
//# sourceMappingURL=verifyRegister.js.map