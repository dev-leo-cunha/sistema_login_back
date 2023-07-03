import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import * as UserServices from "../services/userService";
import dotenv from "dotenv";
import { or } from "sequelize";
dotenv.config();

// Função para lidar com o registro de novos usuários
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, fullName, passwordRepeat } = req.body;
  try {
    const result = await UserServices.register({
      email,
      password,
      fullName,
      passwordRepeat,
    });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const result = await UserServices.checkEmail(email);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

// fução para lidar com a autenticação do usuário.
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const result = await UserServices.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// função para, assim que autenticado, dar acesso ao usuário.
export const access = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let users = await User.findAll();
    let listOff: string[] = [];

    for (let i in users) {
      listOff.push(users[i].fullName);
    }
    const list = listOff.map((i) => i.toUpperCase());

    return res.json({ list });
  } catch (error) {
    next(error);
  }
};

// função para listar os usuários em ordem crescende ou decrescente.
export const listOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { order } = req.body;
  try {
    let users = await User.findAll();
    let listOff: string[] = [];

    for (let i in users) {
      listOff.push(users[i].fullName);
    }
    const list = listOff.map((i) => i.toUpperCase());
    if (order === "desc") {
      list.sort((a, b) => b.localeCompare(a));
    }
    if (order === "asc") {
      list.sort();
    }
    return res.json({ list });
  } catch (error) {
    next(error);
  }
};

// função para atualizar os dados do usuário.
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { newName, newPassword, password } = req.body;
  const { userId } = req;
  try {
    const result = await UserServices.update(
      newName,
      newPassword,
      password,
      userId
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
