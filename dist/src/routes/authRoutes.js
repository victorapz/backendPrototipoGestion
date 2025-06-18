import { body, validationResult } from 'express-validator';
import { Router } from 'express';
import { login } from '../controllers/authController';
const router = Router();
// 2. Implementación corregida
const loginHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        await login(req, res);
        next();
    }
    catch (error) {
        next(error);
    }
};
router.post('/login', [
    body('correoElectronico')
        .isEmail().withMessage('Debe ser un correo válido')
        .notEmpty().withMessage('Correo es requerido'),
    body('contrasena')
        .isLength({ min: 6 }).withMessage('Mínimo 6 caracteres')
        .notEmpty().withMessage('Contraseña es requerida')
], loginHandler // Usar el manejador tipado
);
export default router;
