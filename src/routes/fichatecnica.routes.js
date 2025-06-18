import routes from 'express';
import * as fichatecnicacontroller from '../controllers/fichatecnica.controller.js';

const router = routes.Router();

router.get('/', fichatecnicacontroller.getFichasTecnicas);
router.get('/:id', fichatecnicacontroller.getFichaTecnica);
router.post('/', fichatecnicacontroller.createFichaTecnica);
router.put('/:id', fichatecnicacontroller.updateFichaTecnica);
router.delete('/:id', fichatecnicacontroller.deleteFichaTecnica);
router.get('/licitacion/:id', fichatecnicacontroller.getFichasTecnicasByLicitacion);