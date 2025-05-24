import { Router } from 'express';
import {
  getAllProyectos,
  createProyecto,
  deleteProyecto
} from '../controllers/proyecto.controller';

const router = Router();
router.get('/', getAllProyectos);
router.post('/', createProyecto);
router.delete('/:id', deleteProyecto);

export default router;