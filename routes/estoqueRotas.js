import { Router } from "express";
import {
  listarEstoquesController,
  obterEstoquePorIdController,
  criarEstoqueController,
  atualizarEstoqueController,
  excluirEstoqueController
} from "../controllers/EstoqueController.js";

const router = Router();


router.get("/", listarEstoquesController);
router.get("/:id", obterEstoquePorIdController);
router.post("/", criarEstoqueController);
router.put("/:id", atualizarEstoqueController);
router.delete("/:id", excluirEstoqueController);



router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST');
  res.status(204).send();
});


router.options('/:id', (req, res) => {
  res.setHeader('Allow', 'GET, PUT, DELETE');
  res.status(204).send();
});
export default router;
