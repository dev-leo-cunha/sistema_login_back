import { User } from "../models/User";

export const findUserByEmail = async (email: string) => {
  const result = await User.findOne({ where: { email } });
  return result;
};
export const createUser = async (
  email: string,
  password: string,
  fullName: string
) => {
  const result = await User.create({ email, password, fullName });
  return result;
};

export const findUserById = async (id: string) => {
  const result = await User.findOne({ where: { id } });
  return result;
};

export const updateName = async (id: string, newName: string) => {
  const result = await User.update({ fullName: newName }, { where: { id } });
  return result;
};

export const updatePassword = async (id: string, newPassword: string) => {
  const result = await User.update(
    { password: newPassword },
    { where: { id } }
  );
  return result;
};
