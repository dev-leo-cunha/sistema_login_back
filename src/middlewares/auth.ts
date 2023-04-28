import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
require('dotenv').config()

// middleware para fazer a verificação se o usuário está conectado (Utilizando JWT). 
export const Auth = {
    private:async (req:Request, res:Response, next:NextFunction) => {
        let success = false;
        if(req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer' && token) {
                try {
                    JWT.verify(token, process.env.SECRET_KEY as string)
                    success = true;
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            return res.json({error:'Não Autorizado!'})
        }

        if(success) {
            return next();
        } else {
            return res.json({error:'Não Autorizado!'})
        }
    }
}