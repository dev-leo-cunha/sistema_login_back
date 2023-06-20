import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/tokenHandler";
import { verify } from "jsonwebtoken";

interface TokenPayload {
    id : string;
}

// middleware para fazer a verificação se o usuário está conectado (Utilizando JWT). 
export const Auth = {
    private:async (req:Request, res:Response, next:NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({
            code: "token.missing",
            message: "Token Faltando!",
          });
        }
        const [, token] = authHeader.split(" ");
        try {
          const secret = process.env.SECRET_KEY;
          if (!secret) {
            throw new Error("Não existe a chave do token!");
          }
          const { id } = verify(token, secret) as TokenPayload;
          req.userId = id;
          return next();
        } catch (error) {
          return res.status(401).json({
            code: "token.expired",
            message: "Token expirado",
          });
        }
      }
}