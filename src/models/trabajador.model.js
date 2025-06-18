import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Trabajador = sequelize.define('Trabajador', {
    IDTrabajador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    },
    RutEmpresa: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'empresas', // 👈 Nombre de la tabla en la BD (en minúsculas)
            key: 'RutEmpresa'
        }
    },
    // ... resto de campos
}, {
    tableName: 'trabajadores',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

// Asociación fuera de la definición del modelo
Trabajador.associate = function(models) {
    Trabajador.belongsTo(models.Empresa, {
        foreignKey: 'RutEmpresa',
        targetKey: 'RutEmpresa'
    });
};

export default Trabajador;