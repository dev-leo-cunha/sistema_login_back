import * as _ from 'lodash';
import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import path from 'path';
require('dotenv').config()
import cors from 'cors';
import apiRoutes from './routes/api';

const port = process.env.PORT || "8080"


const server = express();
server.use((req:Request, res:Response, next:NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'https://sistema-login.leonardocunha.dev.br');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

// Definindo que o server irá utilizar JSON para se comunicar.
server.use(express.json());

//usando as rotas
server.use(apiRoutes);

// Caso a api retorne algum erro, retornar erro.
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    return res.status(500).json({
      message: "Erro interno do server.",
    });
  });

// Caso a rota não exista, retornar erro.
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

// função que retorna erro caso tenha algum problema com o servidor.
const errorHandler: ErrorRequestHandler = (err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

// Declarando a porta que o server irá ler.
server.listen(port);