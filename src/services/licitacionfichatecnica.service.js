import LicitacionFichaTecnica from "../models/licitacionfichatecnica.model";
import { ValidationError } from "../errors/validation-error";

const validateLicitacionFichaTecnicaData = (data) => {
    const requiredFields = ["IDFicha", "IDLicitacion"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
        throw new ValidationError(`Faltan campos requeridos: ${missingFields.join(", ")}`);
    }

    if (isNaN(data.IDFicha) || isNaN(data.IDLicitacion)) {
        throw new ValidationError("IDFicha e IDLicitacion deben ser números");
    }
    if (data.IDFicha <= 0 || data.IDLicitacion <= 0) {
        throw new ValidationError("IDFicha e IDLicitacion deben ser mayores que cero");
    }
}

export const getAllLicitacionFichasTecnicas = async () => {
    try {
        return await LicitacionFichaTecnica.findAll();
    } catch (error) {
        throw new Error("Error al obtener fichas técnicas de licitación");
    }
}

export const getLicitacionFichaTecnicaById = async (id) => {
    try {
        const licitacionFichaTecnica = await LicitacionFichaTecnica.findByPk(id);
        if (!licitacionFichaTecnica) throw new Error("Licitación ficha técnica no encontrada");
        return licitacionFichaTecnica;
    } catch (error) {
        throw new Error("Error al obtener ficha técnica de licitación");
    }
};

export const createLicitacionFichaTecnica = async (licitacionFichaTecnicaData) => {
    try {
        validateLicitacionFichaTecnicaData(licitacionFichaTecnicaData);
        const newLicitacionFichaTecnica = await LicitacionFichaTecnica.create(licitacionFichaTecnicaData);
        return newLicitacionFichaTecnica;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new ValidationError("La ficha técnica de licitación ya existe");
        }
        throw error;
    }
}

export const updateLicitacionFichaTecnica = async (id, licitacionFichaTecnicaData) => {
    try {
        validateLicitacionFichaTecnicaData(licitacionFichaTecnicaData);
        const licitacionFichaTecnica = await LicitacionFichaTecnica.findByPk(id);
        if (!licitacionFichaTecnica) throw new Error("Licitación ficha técnica no encontrada");

        const updatedLicitacionFichaTecnica = await licitacionFichaTecnica.update(licitacionFichaTecnicaData);
        return updatedLicitacionFichaTecnica;
    } catch (error) {
        if (error instanceof ValidationError) {
            throw error;
        }
        if (error.message === "Licitación ficha técnica no encontrada") {
            throw new Error("Licitación ficha técnica no encontrada");
        }
        throw error;
    }
}

export const deleteLicitacionFichaTecnica = async (id) => {
    try {
        const licitacionFichaTecnica = await LicitacionFichaTecnica.findByPk(id);
        if (!licitacionFichaTecnica) throw new Error("Licitación ficha técnica no encontrada");

        await licitacionFichaTecnica.destroy();
        return { message: "Licitación ficha técnica eliminada con éxito" };
    } catch (error) {
        if (error.message === "Licitación ficha técnica no encontrada") {
            throw new Error("Licitación ficha técnica no encontrada");
        }
        throw error;
    }
}

export const getLicitacionFichasTecnicasByLicitacionId = async (licitacionId) => {
    try {
        const fichasTecnicas = await LicitacionFichaTecnica.findAll({
            where: { IDLicitacion: licitacionId },
        });
        if (!fichasTecnicas) throw new Error("No se encontraron fichas técnicas para esta licitación");
        return fichasTecnicas;
    } catch (error) {
        throw new Error("Error al obtener fichas técnicas de la licitación");
    }
}