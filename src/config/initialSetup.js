"use strict";
import User from '../models/user.model.js';
import Licitacion from '../models/licitacion.model.js';
import Empresa from '../models/empresa.model.js';
import Cotizacion from '../models/cotizacion.model.js';
import OrdenCompra from '../models/ordenCompra.model.js';
import FichaTecnica from '../models/fichatecnica.model.js';
import LicitacionFichaTecnica from '../models/licitacionfichatecnica.model.js';
import Trabajador from '../models/trabajador.model.js';
import { encryptPassword } from '../helpers/bcrypt.helper.js';
import fs from 'fs';

async function createUser() {
    try {
        // Verificar si ya existe el usuario admin
        const existingUser = await User.findOne({
            where: { correoElectronico: 'admin@reingenieria.com' }
        });

        await User.destroy({
            where: { correoElectronico: 'admin@reingenieria.com' }, 
            force: true
        });

        const testUser = await User.findOne({
            where: { correoElectronico: 'admin@reingenieria.com' },
            attributes: ['contrasena']
        });

        if (!existingUser) {
            await User.create({
                nombre: "admin",
                correoElectronico: "admin@reingenieria.com",
                contrasena: "admin123", 
                telefono: "1234567890",
                rol: "admin"
            });
            console.log("✅ Usuario admin creado exitosamente");
        } else {
            console.log("ℹ️ El usuario admin ya existe");
        }

        const admin = await User.findOne({
            where: { correoElectronico: 'admin@reingenieria.com' },
            attributes: ['contrasena']
        });

        console.log('Hash generado:', admin.contrasena); 

    } catch (error) {
        console.error("❌ Error creando usuario:", error);
        throw error;
    }
}

async function createLicitaciones() {
    try {

        const exisitingLicitaciones = await Licitacion.findAll({});

        if (exisitingLicitaciones.length > 0) {
            console.log("ℹ️ Ya existen licitaciones iniciales");
            return;
        } else {
            await Licitacion.create({
                Licitacion: "6001027084",
                cantidad: 1,
                SAP: 4208898,
                fechaPostulacion: "17-04-2025",
                estado: "Pendiente",
                fechaCreacion: new Date(),
                datos: {
                    tipo: "Tubular",
                    materialTubos: 'Cobre de 3/8"',
                    numeroTubos: 132,
                    dimensiones: {
                        largo: "1470 mm",
                        diametroCarcasa: '8"',
                        flanges: '1-1/2"',
                    },
                    potenciaIntercambio: {
                        valor: 170,
                        unidad: "kW",
                        descripcion: "Estimado en base a diferencia de temperaturas y caudales aproximados"
                    },
                    ladoCaliente: {
                        medio: "Aceite",
                        temperaturaEntrada: "55 °C",
                        temperaturaSalida: "32 °C",
                        caudal: "40 m³/h (estimado)"
                    },
                    ladoFrio: {
                        medio: "Agua",
                        temperaturaEntrada: "22 °C",
                        temperaturaSalida: "28 °C",
                        caudal: "45 m³/h (estimado)"
                    },
                    requisitosAdicionales: {
                        caidaPresion: "30 kPa",
                        presionDiseno: "8.27 bar (120 psi)"
                    },
                    materialesEstructurales: {
                        tapaCAP: "Acero ASTM A-37",
                        deflectores: "Acero ASTM A-37",
                        barraSeparadores: "Acero ASTM A-37",
                        espejos: "Acero ASTM A-37"
                    },
                    usoDesignado: "Soplador N°9"
                },
                observaciones: [
                    "Expandido mecánico",
                    "Contiene 2 válvulas de bola de tres vías"
                ]
            })
        }

        console.log("Licitaciones iniciales creadas");
    } catch (error) {
        console.error("❌ Error creando licitaciones:", error);
        throw error;
    }

}

async function createEmpresa() {
    try {
        const rut = '12345678-9';

        const existing = await Empresa.findOne({ where: { RutEmpresa: rut } });

        if (existing) {
            await Empresa.destroy({ where: { RutEmpresa: rut }, force: true });
        }

        await Empresa.create({
            RutEmpresa: rut,
            NombreEmpresa: 'Tech Industrial SPA',
            GiroComercial: 'Fabricación de intercambiadores',
            ContactoEmpresa: 'Juan Pérez'
        });

        console.log('✅ Empresa creada exitosamente');
    } catch (error) {
        console.error("❌ Error creando empresa:", error);
        throw error;
    }
}

async function createCotizacion() {
    try {
        const id = 1;

        const existing = await Cotizacion.findOne({ where: { IDCotizacion: id } });

        if (existing) {
            await Cotizacion.destroy({ where: { IDCotizacion: id }, force: true });
        }

        await Cotizacion.create({
            IDCotizacion: id,
            ResumenCompra: 'Compra de intercambiador tubular',
            ValorFinal: 2500000
        });

        console.log('✅ Cotización creada exitosamente');
    } catch (error) {
        console.error("❌ Error creando cotización:", error);
        throw error;
    }
}

async function createOrdenCompra() {
    try {
        const id = 1;

        const existing = await OrdenCompra.findOne({ where: { IDOrdenCompra: id } });

        if (existing) {
            await OrdenCompra.destroy({ where: { IDOrdenCompra: id }, force: true });
        }

        await OrdenCompra.create({
            IDOrdenCompra: id,
            Estado: 'Pendiente',
            FechaEntregaEstablecida: '2025-06-01',
            FechaOrdenPreparacion: '2025-05-10',
            FechaFinPreparacion: '2025-05-15',
            FechaEnvio: '2025-05-18',
            Avisos: 'Entregar en bodega central'
        });

        console.log('✅ Orden de compra creada exitosamente');
    } catch (error) {
        console.error("❌ Error creando orden de compra:", error);
        throw error;
    }
}

const base64Content = fs.readFileSync('uploads/ActaDeConstitución.pdf').toString('base64');

async function createFichaTecnica() {
    try {
        const id = 1;
        const existing = await FichaTecnica.findOne({ where: { IDFicha: id } });

        if (existing) {
            await FichaTecnica.destroy({ where: { IDFicha: id }, force: true });
        }

        await FichaTecnica.create({
            IDFicha: id,
            DatosTecnicos: 'Diseño estructural del intercambiador N°9',
            GraficosCurvas: 'curva1.png; curva2.png',
            documento: base64Content, // ⚠️ no recomendado si el archivo es muy grande
        });

        console.log('✅ Ficha técnica creada exitosamente');
    } catch (error) {
        console.error("❌ Error creando ficha técnica:", error);
        throw error;
    }
}

async function createLicitacionFichaTecnica() {
    try {
        const existing = await LicitacionFichaTecnica.findOne({
            where: { IDLicitacion: 1, IDFicha: 1 }
        });

        if (existing) {
            await LicitacionFichaTecnica.destroy({
                where: { IDLicitacion: 1, IDFicha: 1 },
                force: true
            });
        }

        await LicitacionFichaTecnica.create({
            IDLicitacion: 1,
            IDFicha: 1
        });

        console.log('✅ Relación Licitación-Ficha Técnica creada');
    } catch (error) {
        console.error("❌ Error creando relación:", error);
        throw error;
    }
}

async function createTrabajador() {
    try {
        const id = 1;

        const existing = await Trabajador.findOne({ where: { IDTrabajador: id } });

        if (existing) {
            await Trabajador.destroy({ where: { IDTrabajador: id }, force: true });
        }

        await Trabajador.create({
            IDTrabajador: id,
            RutEmpresa: '12345678-9',
            Nombre: 'Pedro González',
            Telefono: '987654321',
            Email: 'pgonzalez@techindustrial.cl',
            Rol: 'Jefe de producción'
        });

        console.log('✅ Trabajador creado exitosamente');
    } catch (error) {
        console.error("❌ Error creando trabajador:", error);
        throw error;
    }
}


export { createUser, createLicitaciones , createEmpresa, createCotizacion, createOrdenCompra, createFichaTecnica, createLicitacionFichaTecnica, createTrabajador };