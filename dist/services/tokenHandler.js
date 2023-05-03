"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const generateToken = (id, email) => {
    const token = jsonwebtoken_1.default.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '2h' });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const key = process.env.SECRET_KEY;
    jsonwebtoken_1.default.verify(token, key);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=tokenHandler.js.map