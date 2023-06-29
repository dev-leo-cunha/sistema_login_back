import JWT from "jsonwebtoken";
require("dotenv").config();

// função para gerar o token de autenticação.
// ele expira em 2 horas.
export const generateToken = (id: number, email: string) => {
  const token = JWT.sign({ id, email }, process.env.SECRET_KEY as string, {
    expiresIn: "2h",
  });

  return token;
};

// função para verificar o token de autenticação.
export const verifyToken = (token: string) => {
  const key = process.env.SECRET_KEY as string;
  JWT.verify(token, key);
};
