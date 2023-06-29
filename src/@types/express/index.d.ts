// Adicionando a tipagem do userId no Request do Express
declare namespace Express {
  export interface Request {
    userId: string;
  }
}
