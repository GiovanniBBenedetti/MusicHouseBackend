import express from 'express'
import { listarFornecedoresController, criarFornecedorController, obterFornecedorPorIdController, atualizarFornecedorController, excluirFornecedorController } from '../controllers/FornecedorController.js';
const router = express.Router();


router.get('/', listarFornecedoresController)
router.post('/', criarFornecedorController)
router.get('/:id', obterFornecedorPorIdController)
router.put('/:id', atualizarFornecedorController)
router.delete('/:id', excluirFornecedorController)



export default router