// licitacionFichaTecnica.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
// Importar modelos relacionados
import Licitacion from './licitacion.model.js';
import FichaTecnica from './fichatecnica.model.js';

const LicitacionFichaTecnica = sequelize.define('LicitacionFichaTecnica', {
    IDLicitacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Licitacion, // Referencia directa al modelo
            key: 'id'
        }
    },
    IDFicha: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: FichaTecnica, // Referencia directa al modelo
            key: 'IDFicha'
        }
    }
}, {
    tableName: 'licitacion_ficha_tecnica',
    timestamps: false
});

export default LicitacionFichaTecnica;