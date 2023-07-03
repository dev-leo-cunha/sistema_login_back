import { ICreate } from "../interfaces/userInterface";
import * as UserRepositories from "../repositories/UserRepositories";
import { CompareHash, encryptHash } from "./bcryptHash";
import EmailValidator from "email-validator";
import { generateToken } from "./tokenHandler";
import { sign } from "jsonwebtoken";
// Funções para verificar todos os dados mandados pelo usuário e fazer requisições para o Repositório.

// Função para registrar um novo usuário.
// Ela faz todas as verificações necessárias antes de fazer requisições para o Repositório.
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
  const checkEmail = EmailValidator.validate(email);
  if (!checkEmail) {
    throw new Error("E-mail inválido.");
  }
  const findUser = await UserRepositories.findUserByEmail(email);
  if (findUser) {
    throw new Error("E-mail já cadastrado.");
  }
  const hashPassword = await encryptHash(password);
  const token = sign({ email }, process.env.SECRET_KEY as string, {
    expiresIn: "1h",
  });
  const newUser = await UserRepositories.createUser(
    email,
    hashPassword,
    fullName,
    token
  );

  return newUser;
};

export const checkEmail = async (email: string) => {
  const checkEmail = EmailValidator.validate(email);
  if (!checkEmail) {
    return { status: false, msg:'Email Inválido' };
  }
  const findUser = await UserRepositories.findUserByEmail(email);
  if (findUser) {
    return { status: false, msg:'Email já em utilização!' };
  } else {
    return { status: true };
  }
};

// Função para fazer o Login do usuário.
// Verifica todos os dados mandados pelo usuário.
// Se tudo estiver correto, cria o token de autenticação e faz requisições para o Repositório para procurar o usuário.
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
  const token = generateToken(findUser.id, findUser.email);

  return { token, email: findUser.email, fullName: findUser.fullName };
};

// Função para atualizar informações do usuário.
// Verifica todos os dados mandados pelo usuário.
// Se tudo estiver correto, faz requisições para o Repositório para atualizar os dados.
export const update = async (
  newName: string,
  newPassword: string,
  password: string,
  userId: string
) => {
  if (!password) {
    throw new Error("Campo de senha antiga Obrigatório!");
  }
  const findUser = await UserRepositories.findUserById(userId);
  if (!findUser) {
    throw new Error("Usuário não encontrado!");
  }
  const match = await CompareHash(password, findUser.password);
  if (!match) {
    throw new Error("Senha antiga incorreta!!");
  }
  if (newName) {
    await UserRepositories.updateName(userId, newName);
  }
  if (newPassword) {
    const hashPassword = await encryptHash(newPassword);
    await UserRepositories.updatePassword(userId, hashPassword);
  }
  return {
    message: "Usuário atualizado com sucesso! Você será Redirecionado",
    id: userId,
  };
};
