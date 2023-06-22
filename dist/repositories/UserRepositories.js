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
exports.updatePassword = exports.updateName = exports.findUserById = exports.createUser = exports.findUserByEmail = void 0;
const User_1 = require("../models/User");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.User.findOne({ where: { email } });
    return result;
});
exports.findUserByEmail = findUserByEmail;
const createUser = (email, password, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.User.create({ email, password, fullName });
    return result;
});
exports.createUser = createUser;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.User.findOne({ where: { id } });
    return result;
});
exports.findUserById = findUserById;
const updateName = (id, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.User.update({ fullName: newName }, { where: { id } });
    return result;
});
exports.updateName = updateName;
const updatePassword = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.User.update({ password: newPassword }, { where: { id } });
    return result;
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=UserRepositories.js.map