import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { encryptPassword } from '../helpers/bcrypt.helper.js'; // 👈 Importa tu helper

const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correoElectronico: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    contrasena: {
        type: DataTypes.STRING(60), // ¡Debe ser 60 caracteres para bcrypt!
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        validate: {
            is: /^\d{10}$/
        }
    },
    rol: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
}, {
    hooks: { // 👈 ¡Esto es lo que falta!
        beforeCreate: async (user) => {
            user.contrasena = await encryptPassword(user.contrasena);
        },
        beforeUpdate: async (user) => {
            if (user.changed('contrasena')) {
                user.contrasena = await encryptPassword(user.contrasena);
            }
        }
    },
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

export default User;