// cotizacion.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cotizacion = sequelize.define('Cotizacion', {
    IDCotizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    },
    ResumenCompra: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ValorFinal: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'cotizaciones',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

export default Cotizacion;