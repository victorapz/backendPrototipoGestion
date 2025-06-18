import { Request, Response } from 'express';
import prisma from '@/lib/prisma'; // Usando alias de ruta
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
    console.log("Solicitud recibida:", req.method, req.url);
    console.log("Cuerpo de la solicitud:", req.body);  // Asegúrate de que req.body esté presente

    if (!req.body.correoElectronico || !req.body.contrasena) {
        return res.status(400).json({ error: "Faltan credenciales" });
    }

    try {
        const usuario = await prisma.user.findUnique({
            where: { correoElectronico: req.body.correoElectronico },  // Aquí debe coincidir con el frontend
        });

        if (!usuario) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const contrasenaValida = await bcrypt.compare(
            req.body.contrasena,
            usuario.contrasena
        );

        if (!contrasenaValida) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
