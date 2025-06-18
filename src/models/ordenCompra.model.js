// ordenCompra.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const OrdenCompra = sequelize.define('OrdenCompra', {
    IDOrdenCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    },
    Estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaEntregaEstablecida: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaOrdenPreparacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaFinPreparacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaEnvio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Avisos: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'ordenes_compra',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

export default OrdenCompra;