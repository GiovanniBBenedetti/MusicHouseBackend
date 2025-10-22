import express from 'express';
import { listarCategoriaController, obterCategoriaPorIdController, criarCategoriaController, excluirCategoriaController } from '../controllers/CategoriaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/iconesCategorias'));
    },
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});
const upload = multer({ storage: storage });


router.get('/', listarCategoriaController)
router.get('/:id', obterCategoriaPorIdController)
router.post('/', upload.single('icone'), criarCategoriaController)
router.delete('/:id', excluirCategoriaController)



router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST');
  res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, DELETE');
    res.status(204).send();
  });

export default router;