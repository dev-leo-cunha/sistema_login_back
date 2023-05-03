import JWT from "jsonwebtoken"
require('dotenv').config()

export const generateToken = (id:number, email:string)=>{
    const token = JWT.sign({id, email},
        process.env.SECRET_KEY as string,
        {expiresIn: '2h'});

        return token;
}

export const verifyToken = (token:string)=>{
    const key = process.env.SECRET_KEY as string
    JWT.verify(token, key);
}