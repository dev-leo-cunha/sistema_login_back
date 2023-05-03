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
exports.CompareHash = exports.encryptHash = void 0;
const bcrypt = require('bcrypt');
const encryptHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(12);
    const passwordHash = yield bcrypt.hash(password, salt);
    return passwordHash;
});
exports.encryptHash = encryptHash;
const CompareHash = (password, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(password, userPassword);
});
exports.CompareHash = CompareHash;
//# sourceMappingURL=bcryptHash.js.map