import Licitacion from '../models/licitacion.model.js';
import { ValidationError } from '../errors/validation-error.js';

const validateLicitacionData = (data) => {
    const requiredFields = ['Licitacion', 'cantidad', 'SAP', 'fechaPostulacion', 'estado', 'datos'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
        throw new ValidationError(`Faltan campos requeridos: ${missingFields.join(', ')}`);
    }

    if (typeof data.cantidad !== 'number' || data.cantidad <= 0) {
        throw new ValidationError('Cantidad debe ser un número positivo');
    }

    if (!/^\d{2}-\d{2}-\d{4}$/.test(data.fechaPostulacion)) {
        throw new ValidationError('Formato de fecha inválido (DD-MM-YYYY)');
    }
};

export const getAllLicitaciones = async () => {
    try {
        return await Licitacion.findAll();
    } catch (error) {
        throw new Error('Error al obtener licitaciones');
    }
};

export const getLicitacionById = async (id) => {
    try {
        const licitacion = await Licitacion.findByPk(id);
        if (!licitacion) throw new Error('Licitación no encontrada');
        return licitacion;
    } catch (error) {
        throw new Error('Error al obtener licitación');
    }
};

export const createLicitacion = async (licitacionData) => {
    try {
        validateLicitacionData(licitacionData);
        const newLicitacion = await Licitacion.create(licitacionData);
        return newLicitacion;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new ValidationError('La licitación ya existe');
        }
        throw error;
    }
};

export const updateLicitacion = async (id, licitacionData) => {
    try {
        validateLicitacionData(licitacionData);
        const licitacion = await Licitacion.findByPk(id);
        if (!licitacion) throw new Error('Licitación no encontrada');

        const updatedLicitacion = await licitacion.update(licitacionData);
        return updatedLicitacion;
    } catch (error) {
        throw new Error('Error al actualizar licitación');
    }
};

export const deleteLicitacion = async (id) => {
    try {
        const licitacion = await Licitacion.findByPk(id);
        if (!licitacion) throw new Error('Licitación no encontrada');

        await licitacion.destroy();
        return { message: 'Licitación eliminada exitosamente' };
    } catch (error) {
        throw new Error('Error al eliminar licitación');
    }
};