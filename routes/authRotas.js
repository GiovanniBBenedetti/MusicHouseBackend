import express from "express";
import {
  login,
  verificarCodigo,
  alterarSenhaPrimeiroAcesso, 
  forgotPassword,
  resetPassword,
  logout, verificarAutenticacaoUsuario
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login)
router.post("/verificar-codigo", verificarCodigo)
router.post("/alterar-senha-primeiro-acesso", alterarSenhaPrimeiroAcesso)
router.post("/esqueci-senha", forgotPassword)
router.post("/resetar-senha/:token", resetPassword)
router.post("/logout", logout)
router.get("/auth-check", verificarAutenticacaoUsuario) 

export default router;
