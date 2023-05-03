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
exports.Auth = void 0;
const tokenHandler_1 = require("../services/tokenHandler");
// middleware para fazer a verificação se o usuário está conectado (Utilizando JWT). 
exports.Auth = {
    private: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let success = false;
        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if (authType === 'Bearer' && token) {
                try {
                    (0, tokenHandler_1.verifyToken)(token);
                    success = true;
                }
                catch (error) {
                    return res.json({ error: 'Não Autorizado!' });
                }
            }
        }
        if (success) {
            return next();
        }
        else {
            return res.json({ error: 'Não Autorizado!' });
        }
    })
};
//# sourceMappingURL=auth.js.map