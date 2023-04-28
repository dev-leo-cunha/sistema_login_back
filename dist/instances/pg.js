"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
// Usando o Sequelize para fazer a conexão ao postgres
exports.sequelize = new sequelize_1.Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Desativa a verificação SSL
        },
    },
});
exports.sequelize.authenticate()
    .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados.');
})
    .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
//# sourceMappingURL=pg.js.map