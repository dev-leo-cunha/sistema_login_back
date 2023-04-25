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
exports.access = exports.login = exports.register = exports.ping = void 0;
const User_1 = require("../models/User");
const bcrypt = require('bcrypt');
const email_validator_1 = __importDefault(require("email-validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Função para verificar se o servidor está funcionando corretamente
const ping = (req, res) => {
    return res.json({ pong: true });
};
exports.ping = ping;
// Função para lidar com o registro de novos usuários
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password && req.body.fullName && req.body.passwordRepeat) {
        let { email, password, fullName, passwordRepeat } = req.body;
        if (!email_validator_1.default.validate(email)) {
            return res.json({ error: 'Email Inválido!' });
        }
        if (password !== passwordRepeat) {
            return res.json({ error: 'As Senhas não conferem!' });
        }
        if (password.length <= 3 || passwordRepeat.length <= 3) {
            return res.json({ error: 'Senha Fraca!' });
        }
        let hasUser = yield User_1.User.findOne({ where: { email } });
        if (!hasUser) {
            const salt = yield bcrypt.genSalt(12);
            const passwordHash = yield bcrypt.hash(password, salt);
            let newUser = yield User_1.User.create({ email, password: passwordHash, fullName });
            const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.SECRET_KEY, { expiresIn: '2h' });
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
        let email = req.body.email;
        let password = req.body.password;
        let user = yield User_1.User.findOne({
            where: { email }
        });
        if (user) {
            const match = yield bcrypt.compare(password, user.password);
            if (!match) {
                return res.json({ status: false });
            }
            try {
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '2h' });
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
