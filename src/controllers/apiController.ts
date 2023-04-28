import { Request, Response } from 'express';
import { User } from '../models/User';
const bcrypt = require('bcrypt');
import EmailValidator from 'email-validator';
import JWT from 'jsonwebtoken';
require('dotenv').config()

// Função para verificar se o servidor está funcionando corretamente
export const ping = (req: Request, res: Response) => {
    return res.json({pong: true});
}

// Função para lidar com o registro de novos usuários
export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password && req.body.fullName && req.body.passwordRepeat) {
        let { email, password, fullName, passwordRepeat } = req.body;
            if(!EmailValidator.validate(email)) {
                return res.json({error: 'Email Inválido!'})
            }
            if(password !== passwordRepeat) {
                return res.json({error: 'As Senhas não conferem!'})
            }
            if(password.length <= 3 || passwordRepeat.length <= 3) {
                return res.json({error: 'Senha Fraca!'})
            }
            let hasUser = await User.findOne({where: { email }});

            if(!hasUser) {
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(password, salt);
                let newUser = await User.create({ email, password:passwordHash, fullName });

                const token = JWT.sign(
                    {id: newUser.id, email: newUser.email},
                    process.env.SECRET_KEY as string,
                    { expiresIn: '2h' }
                    );
                return res.json({ email, fullName, token })
            } else {
            return res.json({ error: 'E-mail já cadastrado.' });
            }
    }
    return res.json({ error: 'Preencha todos os dados!' });
}


// fução para lidar com a autenticação do usuário.
export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email as string;
        let password: string = req.body.password as string;

        let user = await User.findOne({ 
            where: { email }
        });

        if(user) {
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return res.json({ status: false});
            }
            try {
                const token = JWT.sign(
                    {id: user.id},
                    process.env.SECRET_KEY as string,
                    { expiresIn: '2h' }
                    );
                return res.json({ status:true, token, email:user.email, fullName:user.fullName });
            }   catch (error) {
                return res.json({ status:false });
            }
        }
    }
    res.json({ status: false });
}

// função para, assim que autenticado, dar acesso ao usuário.
export const access = async (req: Request, res: Response) => {
            let users = await User.findAll();
            let list: string[] = [];

            for(let i in users) {
                list.push( users[i].fullName );
            }

            return res.json({ list });
}