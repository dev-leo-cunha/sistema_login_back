const bcrypt = require("bcrypt");

// função para criptografar a senha do usuário.
export const encryptHash = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

// função para comparar a senha do usuário e autenticar.
export const CompareHash = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
};
