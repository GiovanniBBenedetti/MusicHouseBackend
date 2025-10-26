import jwt from 'jsonwebtoken';
import { read, compare, update } from '../config/database.js';
import { JWT_SECRET } from '../config/jwt.js';
import { enviarEmailCodigo } from '../tools/nodemailer.js';

const loginController = async (req, res) => {
  const { id_registro, senha } = req.body;

  try {
   
    const resultado = await read('funcionarios', `id_registro = '${id_registro}'`);
    const funcionario = Array.isArray(resultado) ? resultado[0] : resultado;

    if (!funcionario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }


    const senhaCorreta = await compare(senha, funcionario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    if (funcionario.primeiroLogin === 0) {

      const codigo = Math.floor(100000 + Math.random() * 900000).toString();

      
      await enviarEmailCodigo(funcionario.nome_completo, codigo, funcionario.email);


      await update('funcionarios', { token: codigo }, `id_registro = '${id_registro}'`);
      await update('funcionarios', { primeiroLogin: 1 }, `id_registro = '${id_registro}'`);

      return res.status(200).json({
        mensagem: 'Primeiro login - código enviado ao e-mail do funcionário.',
        etapa: 'codigo',
      });
    }

   
    const token = jwt.sign(
      { id: funcionario.id_registro, email: funcionario.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      etapa: 'login',
      token,
      funcionario: {
        id_registro: funcionario.id_registro,
        nome: funcionario.nome_completo,
        email: funcionario.email,
      },
    });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};


export {loginController}