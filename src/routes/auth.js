import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js'; // 👈 Importa tu modelo Sequelize

dotenv.config();

const router = express.Router();

// POST /login
router.post('/login', async (req, res) => {
    const { correoElectronico, contrasena } = req.body;

    try {
        // Busca el usuario directamente con Sequelize
        const user = await User.findOne({
            where: { correoElectronico },
            attributes: ['id', 'contrasena', 'rol'] // Selecciona solo campos necesarios
        });

        if (!user) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        // Debug: Verifica el hash almacenado
        console.log('Hash en BD:', user.contrasena);
        console.log('Longitud hash:', user.contrasena.length);

        // Compara contraseñas
        const esValida = await bcrypt.compare(contrasena.trim(), user.contrasena);
        console.log('¿Contraseña válida?', esValida);

        if (!esValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Genera token JWT
        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// POST /register
router.post('/register', async (req, res) => {
    const { nombre, correoElectronico, contrasena, telefono } = req.body;

    try {
        // Crea el usuario usando Sequelize (los hooks hashearán la contraseña)
        await User.create({
            nombre,
            correoElectronico,
            contrasena, // 👈 Sequelize aplicará el hash automáticamente
            telefono,
            rol: 'user'
        });

        res.status(201).json({ mensaje: 'Usuario creado con éxito' });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
});

export default router;