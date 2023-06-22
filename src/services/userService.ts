import { ICreate } from "../interfaces/userInterface";
import * as UserRepositories from "../repositories/UserRepositories";
import { CompareHash, encryptHash } from "./bcryptHash";
import EmailValidator from "email-validator";
import { generateToken } from "./tokenHandler";

export const register = async ({
  email,
  password,
  fullName,
  passwordRepeat,
}: ICreate) => {
  if (!email || !password || !fullName || !passwordRepeat) {
    throw new Error("Preencha todos os campos.");
  }
  if (password !== passwordRepeat) {
    throw new Error("Senhas não conferem.");
  }
  const checkEmail = await EmailValidator.validate(email);
  if (!checkEmail) {
    throw new Error("E-mail inválido.");
  }
  const findUser = await UserRepositories.findUserByEmail(email);
  if (findUser) {
    throw new Error("E-mail já cadastrado.");
  }
  const hashPassword = await encryptHash(password);
  const newUser = await UserRepositories.createUser(
    email,
    hashPassword,
    fullName
  );

  return newUser;
};

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Preencha todos os campos.");
  }
  const findUser = await UserRepositories.findUserByEmail(email);
  if (!findUser) {
    throw new Error("Email ou Senha incorreta.");
  }
  const match = await CompareHash(password, findUser.password);
  if (!match) {
    throw new Error("Email ou Senha incorreta.");
  }
  const token = await generateToken(findUser.id, findUser.email);

  return { token, email: findUser.email, fullName: findUser.fullName };
};

/* export const update = async (
  newName: string,
  newPassword: string,
  password: string,
  userId: string
) => {
  if (!password) {
    throw new Error("Campo de senha Obrigatório!");
  }
  const findUser = await UserRepositories.findUserById(userId);
  if (!findUser) {
    throw new Error("Usuário não encontrado!");
  }
  const match = await CompareHash(password, findUser.password);
  if (!match) {
    throw new Error("Senha incorreta!!");
  }
  if (newName) {
    await UserRepositories.updateName(userId, newName);
  }
  if (newPassword) {
    const hashPassword = await encryptHash(newPassword);
    await UserRepositories.updatePassword(userId, hashPassword);
  }
  return { message: "Usuário atualizado com sucesso!" };
};*/
