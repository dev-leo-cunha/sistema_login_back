"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = require("../instances/pg");
// definindo o que cada instância está no postgres e nome da tabela.
exports.User = pg_1.sequelize.define('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});
//# sourceMappingURL=User.js.map