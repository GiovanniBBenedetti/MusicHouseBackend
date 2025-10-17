import express from 'express';
import {
  listarFuncionariosController,
  obterFuncionarioPorIdController,
  criarFuncionarioController,
} from '../controllers/FuncionariosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});
const upload = multer({ storage: storage });

router.get('/', listarFuncionariosController);
router.get('/:id', obterFuncionarioPorIdController);
router.post('/', upload.single('fotoPerfil'),criarFuncionarioController);

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST');
  res.status(204).send();
});

export default router;