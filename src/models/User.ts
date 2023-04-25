import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

 // criando as instâncias que seram utilizadas como modelo de usuário
export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
    fullName: string
}

// definindo o que cada instância está no postgres e nome da tabela.
export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});