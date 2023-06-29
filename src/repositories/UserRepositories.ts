import { User } from "../models/User";
// Funções para manipular o banco de dados.

// Função para procurar um usuário pelo email.
export const findUserByEmail = async (email: string) => {
  const result = await User.findOne({ where: { email } });
  return result;
};
// Função para criar um novo usuário.
export const createUser = async (
  email: string,
  password: string,
  fullName: string,
  token: string
) => {
  const result = await User.create({ email, password, fullName, token });
  return result;
};

// Função para procurar um usuário pelo id.
export const findUserById = async (id: string) => {
  const result = await User.findOne({ where: { id } });
  return result;
};

// Função para atualizar o nome do usuário.
export const updateName = async (id: string, newName: string) => {
  const result = await User.update({ fullName: newName }, { where: { id } });
  return result;
};

// Função para atualizar a senha do usuário.
export const updatePassword = async (id: string, newPassword: string) => {
  const result = await User.update(
    { password: newPassword },
    { where: { id } }
  );
  return result;
};
