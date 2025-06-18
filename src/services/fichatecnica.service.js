// import FichaTecnica from "../models/fichatecnica.model";
// import { ValidationError } from "../errors/validation-error";

// const validateFichaTecnicaData = (data) => {
//     const requiredFields = ["nombre", "descripcion", "fechaCreacion", "estado"];
//     const missingFields = requiredFields.filter((field) => !data[field]);

//     if (missingFields.length > 0) {
//         throw new ValidationError(`Faltan campos requeridos: ${missingFields.join(", ")}`);
//     }

//     if (!/^\d{2}-\d{2}-\d{4}$/.test(data.fechaCreacion)) {
//         throw new ValidationError("Formato de fecha inválido (DD-MM-YYYY)");
//     }
// }

// export const getAllFichasTecnicas = async () => {
//     try {
//         return await FichaTecnica.findAll();
//     } catch (error) {
//         throw new Error("Error al obtener fichas técnicas");
//     }
// };

// export const getFichaTecnicaById = async (id) => {
//     try {
//         const fichaTecnica = await FichaTecnica.findByPk(id);
//         if (!fichaTecnica) throw new Error("Ficha técnica no encontrada");
//         return fichaTecnica;
//     } catch (error) {
//         throw new Error("Error al obtener ficha técnica");
//     }
// };

// export const createFichaTecnica = async (fichaTecnicaData) => {
//     try {
//         validateFichaTecnicaData(fichaTecnicaData);
//         const newFichaTecnica = await FichaTecnica.create(fichaTecnicaData);
//         return newFichaTecnica;
//     } catch (error) {
//         if (error.name === "SequelizeUniqueConstraintError") {
//             throw new ValidationError("La ficha técnica ya existe");
//         }
//         throw error;
//     }
// };

// export const updateFichaTecnica = async (id, fichaTecnicaData) => {
//     try {
//         validateFichaTecnicaData(fichaTecnicaData);
//         const fichaTecnica = await FichaTecnica.findByPk(id);
//         if (!fichaTecnica) throw new Error("Ficha técnica no encontrada");

//         const updatedFichaTecnica = await fichaTecnica.update(fichaTecnicaData);
//         return updatedFichaTecnica;
//     } catch (error) {
//         if (error instanceof ValidationError) {
//             throw error;
//         }
//         if (error.message === "Ficha técnica no encontrada") {
//             throw new Error("Ficha técnica no encontrada");
//         }
//         throw new Error("Error al actualizar ficha técnica");
//     }
// };

// export const deleteFichaTecnica = async (id) => {
//     try {
//         const fichaTecnica = await FichaTecnica.findByPk(id);
//         if (!fichaTecnica) throw new Error("Ficha técnica no encontrada");

//         await fichaTecnica.destroy();
//         return { message: "Ficha técnica eliminada con éxito" };
//     } catch (error) {
//         if (error.message === "Ficha técnica no encontrada") {
//             throw new Error("Ficha técnica no encontrada");
//         }
//         throw new Error("Error al eliminar ficha técnica");
//     }
// };
