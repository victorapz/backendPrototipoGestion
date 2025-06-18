// licitacion.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Licitacion = sequelize.define('Licitacion', {
    Licitacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SAP: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaPostulacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    datos: {
        type: DataTypes.JSON,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'licitaciones',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

Licitacion.associate = function(models) {
    Licitacion.belongsToMany(models.FichaTecnica, {
        through: 'LicitacionFichaTecnica',
        foreignKey: 'IDLicitacion'
    });
};

export default Licitacion;