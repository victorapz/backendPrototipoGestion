import * as licitacionService from '../services/licitacion.service.js';
import { ValidationError } from '../errors/validation-error.js';

export const getLicitaciones = async (req, res) => {
    try {
        const licitaciones = await licitacionService.getAllLicitaciones();
        res.status(200).json(licitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLicitacion = async (req, res) => {
    try {
        const licitacion = await licitacionService.getLicitacionById(req.params.id);
        res.status(200).json(licitacion);
    } catch (error) {
        if (error.message === 'Licitación no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const createLicitacion = async (req, res) => {
    try {
        const newLicitacion = await licitacionService.createLicitacion(req.body);
        res.status(201).json(newLicitacion);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateLicitacion = async (req, res) => {
    try {
        const updatedLicitacion = await licitacionService.updateLicitacion(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedLicitacion);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'Licitación no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteLicitacion = async (req, res) => {
    try {
        const result = await licitacionService.deleteLicitacion(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Licitación no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};