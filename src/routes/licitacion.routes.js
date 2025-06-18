import { Router } from 'express';
import * as licitacionController from '../controllers/licitacion.controller.js';

const router = Router();

// GET /licitaciones
router.get('/', licitacionController.getLicitaciones);

// GET /licitaciones/:id
router.get('/:id', licitacionController.getLicitacion);

// POST /licitaciones
router.post('/', licitacionController.createLicitacion);

// PUT /licitaciones/:id
router.put('/:id', licitacionController.updateLicitacion);

// DELETE /licitaciones/:id
router.delete('/:id', licitacionController.deleteLicitacion);

export default router;