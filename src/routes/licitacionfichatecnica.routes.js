import router from 'express';
import * as licitacionfichatecnicaController from '../controllers/licitacionfichatecnica.controller.js';

// const router = router.Router();

router.get('/', licitacionfichatecnicaController.getLicitacionFichasTecnicas);
router.get('/:id', licitacionfichatecnicaController.getLicitacionFichaTecnica);
router.post('/', licitacionfichatecnicaController.createLicitacionFichaTecnica);
router.put('/:id', licitacionfichatecnicaController.updateLicitacionFichaTecnica);
router.delete('/:id', licitacionfichatecnicaController.deleteLicitacionFichaTecnica);
router.get('/licitacion/:id', licitacionfichatecnicaController.getLicitacionFichasTecnicasByLicitacion);