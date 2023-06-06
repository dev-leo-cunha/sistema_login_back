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
