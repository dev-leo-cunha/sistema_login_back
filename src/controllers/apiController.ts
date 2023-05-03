import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../services/tokenHandler';
import { verifyRegister } from '../services/verifyRegister';
import { encryptHash, CompareHash } from '../services/bcryptHash';
require('dotenv').config()

// Função para lidar com o registro de novos usuários
export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password && req.body.fullName && req.body.passwordRepeat) {
        let { email, password, fullName, passwordRepeat } = req.body;
            const verify = verifyRegister(email,password,passwordRepeat)
            if(typeof verify === 'string') {
                return res.json({error: verify})
            }            
            let hasUser = await User.findOne({where: { email }});
            if(!hasUser) {
                const passwordHash = await encryptHash(password)
                let newUser = await User.create({ email, password:passwordHash, fullName });
                const token = generateToken(newUser.id, newUser.email);

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
        let {email, password} = req.body;

        let user = await User.findOne({where: { email }});

        if(user) {
            const match =  await CompareHash(password, user.password)
            console.log(match)

            if(!match) { return res.json({ status: false}) }

            try {
                const token = generateToken(user.id, user.email);

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