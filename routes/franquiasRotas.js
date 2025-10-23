import express from 'express';
import {
  criarFranquiaController,
  editarFranquiaController,
  listarFranquiasControler,
  
} from '../controllers/FranquiasController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { obterFranquiaPorId } from '../models/Franquia.js';
const router = express.Router();

router.get('/', listarFranquiasControler)
router.get(':id', obterFranquiaPorId)
router.post('/', criarFranquiaController);
router.put('/:id', editarFranquiaController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST');
  res.status(204).send();
});

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, PUT');
  res.status(204).send();
});

export default router;