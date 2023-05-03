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
Object.defineProperty(exports, "__esModule", { value: true });
exports.access = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const tokenHandler_1 = require("../services/tokenHandler");
const verifyRegister_1 = require("../services/verifyRegister");
const bcryptHash_1 = require("../services/bcryptHash");
require('dotenv').config();
// Função para lidar com o registro de novos usuários
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password && req.body.fullName && req.body.passwordRepeat) {
        let { email, password, fullName, passwordRepeat } = req.body;
        const verify = (0, verifyRegister_1.verifyRegister)(email, password, passwordRepeat);
        if (typeof verify === 'string') {
            return res.json({ error: verify });
        }
        let hasUser = yield User_1.User.findOne({ where: { email } });
        if (!hasUser) {
            const passwordHash = yield (0, bcryptHash_1.encryptHash)(password);
            let newUser = yield User_1.User.create({ email, password: passwordHash, fullName });
            const token = (0, tokenHandler_1.generateToken)(newUser.id, newUser.email);
            return res.json({ email, fullName, token });
        }
        else {
            return res.json({ error: 'E-mail já cadastrado.' });
        }
    }
    return res.json({ error: 'Preencha todos os dados!' });
});
exports.register = register;
// fução para lidar com a autenticação do usuário.
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;
        let user = yield User_1.User.findOne({ where: { email } });
        if (user) {
            const match = yield (0, bcryptHash_1.CompareHash)(password, user.password);
            console.log(match);
            if (!match) {
                return res.json({ status: false });
            }
            try {
                const token = (0, tokenHandler_1.generateToken)(user.id, user.email);
                return res.json({ status: true, token, email: user.email, fullName: user.fullName });
            }
            catch (error) {
                return res.json({ status: false });
            }
        }
    }
    res.json({ status: false });
});
exports.login = login;
// função para, assim que autenticado, dar acesso ao usuário.
const access = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield User_1.User.findAll();
    let list = [];
    for (let i in users) {
        list.push(users[i].fullName);
    }
    return res.json({ list });
});
exports.access = access;
//# sourceMappingURL=apiController.js.map