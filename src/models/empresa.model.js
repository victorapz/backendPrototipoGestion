// empresa.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Trabajador from './trabajador.model.js'; // Importar el modelo Trabajador

const Empresa = sequelize.define('Empresa', {
    RutEmpresa: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    NombreEmpresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    GiroComercial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ContactoEmpresa: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'empresas',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

// Asociación fuera de la definición del modelo
Empresa.associate = function(models) {
    Empresa.hasMany(models.Trabajador, {
        foreignKey: 'RutEmpresa',
        sourceKey: 'RutEmpresa'
    });
};

export default Empresa;