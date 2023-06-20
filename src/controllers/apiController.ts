import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import * as UserServices from '../services/UserServices';

// Função para lidar com o registro de novos usuários
export const register = async (req: Request, res: Response, next:NextFunction) => {
    const {email, password, fullName, passwordRepeat} = req.body
    try {
        const result = await UserServices.register({email, password, fullName, passwordRepeat})

        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}
// fução para lidar com a autenticação do usuário.
export const login = async (req: Request, res: Response, next:NextFunction) => {
    const {email, password} = req.body
    try {
        const result = await UserServices.login(email, password)
        return res.status(200).json(result)
    }catch(error){
        next(error)
    }
}

// função para, assim que autenticado, dar acesso ao usuário.
export const access = async (req: Request, res: Response, next:NextFunction) => {
    try {
        let users = await User.findAll();
            let list: string[] = [];

            for(let i in users) {
                list.push( users[i].fullName );
            }

            return res.json({ list });
    } catch (error) {
        next(error)
    }
}
/*
export const update = async (req: Request, res: Response, next:NextFunction) => {
    const {newName, newPassword, password} = req.body
    const {userId} = req
    console.log(userId)
    try {
        const result = await UserServices.update(newName, newPassword, password, userId)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}*/