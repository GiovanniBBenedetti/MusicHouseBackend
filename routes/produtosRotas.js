import express from 'express';
import { listarProdutosController, obterProdutoPorIdController, criarProdutoController, atualizarProdutoController, excluirProdutoController } from '../controllers/ProdutoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/fotosProdutos'));
    },
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});
const upload = multer({ storage: storage });

router.get('/', listarProdutosController)
router.get('/:id',obterProdutoPorIdController)
router.post('/', upload.single('imagem'), criarProdutoController)
router.put('/:id', atualizarProdutoController)
router.delete('/:id', excluirProdutoController)


router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST');
  res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE');
    res.status(204).send();
  });

export default router;