import { Sequelize } from 'sequelize'; 
require('dotenv').config()

// Usando o Sequelize para fazer a conexão ao postgres
export const sequelize = new Sequelize(
    process.env.PGDATABASE as string, 
    process.env.PGUSER  as string, 
    process.env.PGPASSWORD  as string, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Desativa a verificação SSL
      },
    },
  });
sequelize.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });