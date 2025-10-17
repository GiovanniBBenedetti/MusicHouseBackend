import express from 'express';
import {
  listarFuncionariosController,
  obterFuncionarioPorIdController,
  criarFuncionarioController,
} from '../controllers/FuncionariosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', listarFuncionariosController);
router.get('/:id', obterFuncionarioPorIdController);
router.post('/', criarFuncionarioController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST');
  res.status(204).send();
});

export default router;