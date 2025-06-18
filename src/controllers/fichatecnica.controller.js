import * as fichatecnicaService from '../services/fichatecnica.service.js';

export const getFichasTecnicas = async (req, res) => {
    try {
        const fichasTecnicas = await fichatecnicaService.getAllFichasTecnicas();
        res.status(200).json(fichasTecnicas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getFichaTecnica = async (req, res) => {
    try {
        const fichaTecnica = await fichatecnicaService.getFichaTecnicaById(req.params.id);
        res.status(200).json(fichaTecnica);
    } catch (error) {
        if (error.message === 'Ficha técnica no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const createFichaTecnica = async (req, res) => {
    try {
        const newFichaTecnica = await fichatecnicaService.createFichaTecnica(req.body);
        res.status(201).json(newFichaTecnica);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateFichaTecnica = async (req, res) => {
    try {
        const updatedFichaTecnica = await fichatecnicaService.updateFichaTecnica(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedFichaTecnica);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'Ficha técnica no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteFichaTecnica = async (req, res) => {
    try {
        const result = await fichatecnicaService.deleteFichaTecnica(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Ficha técnica no encontrada') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const getFichasTecnicasByLicitacionId = async (req, res) => {
    try {
        const fichasTecnicas = await fichatecnicaService.getFichasTecnicasByLicitacionId(req.params.licitacionId);
        res.status(200).json(fichasTecnicas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}