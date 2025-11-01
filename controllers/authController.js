import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { read, update } from "../config/database.js";
import { JWT_SECRET } from "../config/jwt.js";
import { enviarEmailCodigo, enviarEmailRecuperacao } from "../tools/nodemailer.js";


export const login = async (req, res) => {

  const { id_registro, senha } = req.body;

  try {
    if (!id_registro || !senha) {
      return res.status(400).json({ success: false, message: "Preencha todos os campos." });
    }

    const resultado = await read("funcionarios", `id_registro = '${id_registro}'`);
    const funcionario = Array.isArray(resultado) ? resultado[0] : resultado;

    if (!funcionario) {
      res.status(401).json({ success: false, message: "Número de registro ou senha inválidos" });
      return

    }

    //compara a senha fornecida com a senha hasheada no banco de dados
    const senhaValida = await bcryptjs.compare(senha, funcionario.senha);
    if (!senhaValida) {
      return res.status(401).json({ success: false, message: "Número de registro ou senha inválidos" });
    }
    
    //se o usuário estiver no primeiro login, será enviado um código para o e-mail cadastrado
    if (funcionario.primeiroLogin === 1) {

      const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // Gera um código de 6 dígitos
      const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // Código válido por 10 minutos


      enviarEmailCodigo(funcionario.nome_completo, codigo, funcionario.email); //envia o código por e-mail

      await update("funcionarios", { token: codigo, reset_expires: resetExpires  }, `id_registro = '${id_registro}'`); //salva o código e a expiração no banco de dados
      return res.status(200).json({
        success: true,
        message: "Primeiro acesso: código de verificação enviado ao e-mail.",
        etapa: "codigo",
      });
    }


    const token = jwt.sign(
      { id_registro: funcionario.id_registro },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Verifica se está em produção
    const isProd = process.env.NODE_ENV === "production";

    // Configura o cookie com as opções apropriadas para produção e desenvolvimento
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Login realizado com sucesso.",
      etapa: "login_finalizado",
      funcionario: {
        id_registro: funcionario.id_registro,
        nome: funcionario.nome_completo,
        email: funcionario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ success: false, message: "Erro interno ao fazer login." });
  }
};




export const verificarCodigo = async (req, res) => {
  try {
    const { codigo } = req.body;

    const resultado = await read("funcionarios", `token = '${codigo}' AND reset_expires > NOW()`);
    const funcionario = Array.isArray(resultado) ? resultado[0] : resultado;

    if (!funcionario) {
      return res.status(400).json({ success: false, message: "token incorreto ou expirado" });
    }

    // Zera o token e mantém o primeiroLogin como 0
    await update(
      "funcionarios",
      { token: null, reset_expires: null},
      `token = '${codigo}'`
    );

    return res.status(200).json({
      success: true,
      message: "Código verificado. Defina sua nova senha.",
      etapa: "alterar_senha",
    });
  } catch (error) {
    console.error("Erro ao verificar código:", error);
    res.status(500).json({ success: false, message: "Erro interno ao verificar código." });
  }
};





export const alterarSenhaPrimeiroAcesso = async (req, res) => {
  try {
    const { id_registro, novaSenha } = req.body;

    const resultado = await read("funcionarios", `id_registro = '${id_registro}'`);
    const funcionario = Array.isArray(resultado) ? resultado[0] : resultado;

    if (!funcionario) {
      return res.status(404).json({ success: false, message: "Funcionário não encontrado." });
    }

    // Atualiza a senha hasheando 
    const senhaHash = await bcryptjs.hash(novaSenha, 10);
    await update("funcionarios", { senha: senhaHash }, `id_registro = '${id_registro}'`);


    return res.status(200).json({
      success: true,
      message: "Senha atualizada com sucesso. Login concluído.",
      etapa: "login",
      token
    });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ success: false, message: "Erro interno ao alterar senha." });
  }
};







export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const resultado = await read("funcionarios", `email = '${email}'`);
    const funcionario = Array.isArray(resultado) ? resultado[0] : resultado;

    if (!funcionario) {
      return res.status(404).json({ success: false, message: "Funcionário não encontrado." });
    }

    //gera um token hasehado
    const resetToken = crypto.randomBytes(20).toString("hex");

    //gera um token de expiração para 1 hora para verificação
    const resetExpires = new Date(Date.now() + 3600000);

    //salva os tokens no banco de dados
    await update(
      "funcionarios",
      { reset_token: resetToken, reset_expires: resetExpires },
      `id_registro = '${funcionario.id_registro}'`
    );


    //envia o e-mail com o link de recuperação
    const link = `${process.env.CLIENT_URL}/resetar-senha/${resetToken}`;
    await enviarEmailRecuperacao(funcionario.email, link);

    res.status(200).json({ success: true, message: "E-mail de recuperação enviado com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar e-mail de recuperação:", error);
    res.status(500).json({ success: false, message: "Erro ao enviar e-mail de recuperação." });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { senha } = req.body;

  try {
    const resultado = await read("funcionarios", `reset_token = '${token}'`);
    const funcionario = Array.isArray(resultado) ? resultado[0] : resultado;

    if (!funcionario) {
      return res.status(400).json({ success: false, message: "Token inválido ou expirado." });
    }

    //verifica se o token expirou
    if (new Date(funcionario.reset_expires) < new Date()) {
      return res.status(400).json({ success: false, message: "Token expirado." });
    }


    //atualiza a senha do funcionário no banco de dados
    const senhaHash = await bcryptjs.hash(senha, 10);
    await update(
      "funcionarios",
      { senha: senhaHash, reset_token: null, reset_expires: null },
      `id_registro = '${funcionario.id_registro}'`
    );

    res.status(200).json({ success: true, message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ success: false, message: "Erro ao redefinir senha." });
  }
};


export const verificarAutenticacaoUsuario = async (req, res) => {
  try {

    const idFuncionario = req.usuario.id_registro
    const resultado = await read('funcionarios', `id_registro = '${idFuncionario}'`)
    const user = Array.isArray(resultado) ? resultado[0] : resultado

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - usuário não encontrado' })
    }


    return res.status(200).json({
      autenticado: true,
      usuario: user,
    })
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error)
    return res.status(401).json({ message: 'Unauthorized - token inválido ou expirado' })
  }
}



export const logout = (req, res) => {
  try {
    //limpa o cookie do token
    res.clearCookie('token');
    res.json({ message: 'Logout realizado com sucesso' });
    console.log('Logout realizado com sucesso');

  } catch (error) {
    console.error('Erro ao realizar logout:', error);
    res.status(500).json({ success: false, message: 'Erro ao realizar logout.' });
  }
}