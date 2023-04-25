import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';

dotenv.config();

// Usando o Sequelize para fazer a conexão ao postgres
export const sequelize = new Sequelize(
    process.env.PG_DB as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {
        dialect: 'postgres',
        port: parseInt(process.env.PG_PORT as string)
    }
);