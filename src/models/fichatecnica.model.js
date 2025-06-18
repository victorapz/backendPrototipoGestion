// fichaTecnica.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const FichaTecnica = sequelize.define('FichaTecnica', {
    IDFicha: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false
    },
    DatosTecnicos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    GraficosCurvas: {
        type: DataTypes.STRING
    },
    documento: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'fichas_tecnicas',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
});

FichaTecnica.associate = function(models) {
    FichaTecnica.belongsToMany(models.Licitacion, {
        through: 'LicitacionFichaTecnica',
        foreignKey: 'IDFicha'
    });
};

export default FichaTecnica;