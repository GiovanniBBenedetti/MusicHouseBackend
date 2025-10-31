import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


// Cria o transporte do nodemailer usando o Gmail
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_AUTH_USER, // gmail da MusicHouse no .env
    pass: process.env.MAILER_AUTH_PASS, //senha de app do gmail MusicHouse no .env
  },
});


//tamplete base para os emails
const templateBase = (titulo, conteudoHtml) => `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="font-family:'Arial',sans-serif;background:#f4f6f9;margin:0;padding:0;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
    
    <!-- Cabeçalho -->
    <div style="background:#C1121F;padding:25px;text-align:center;">
      <img src="cid:logoEmail" alt="Logo MusicHouse" style="width:180px;display:block;margin:0 auto 10px auto;">
    </div>

    <!-- Corpo -->
    <div style="padding:25px;text-align:center;color:#131312;">
      ${conteudoHtml}
    </div>

    <!-- Rodapé -->
    <div style="background:#C1121F;color:#fff;text-align:center;padding:15px;font-size:13px;">
      <div style="margin-bottom:10px;">
        <a href="https://www.instagram.com/musichouse" style="color:#fff;text-decoration:none;margin:0 10px;">Instagram</a> |
        <a href="https://www.facebook.com/musichouse" style="color:#fff;text-decoration:none;margin:0 10px;">Facebook</a> |
        <a href="http://localhost:3000/" style="color:#fff;text-decoration:none;margin:0 10px;">Site Oficial</a>
      </div>
      <p style="margin:0;">© 2025 MusicHouse – Todos os direitos reservados</p>
    </div>
  </div>
</body>
</html>
`;




//enviar email com código 2FA
export const enviarEmailCodigo = async (usuario, codigo, emailUsuario) => {
  try {
    const conteudo = `
      <h3>Olá, ${usuario},</h3>
      <p>Para proteger sua conta, utilize o código abaixo para realizar o login com autenticação de dois fatores (2FA):</p>
      <div style="background:#C1121F;color:#fff;font-size:24px;font-weight:bold;padding:12px 30px;border-radius:8px;display:inline-block;margin:20px 0;">
        ${codigo}
      </div>
      <p>Este código expira em <b>10 minutos</b>.</p>
      <p>Se você não solicitou esse código, ignore este e-mail ou contate o suporte imediatamente.</p>
    `;

    await transport.sendMail({
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`, // email do remetente
      to: emailUsuario, // email do funcionário
      subject: `${codigo} – Seu código de login MusicHouse`, // assunto do email 
      html: templateBase("Verificação de Login 2FA", conteudo), // corpo do email em html
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de código enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar email de código:", err);
  }
};

//email de boas-vindas ao funcionário cadastrado
export const enviarEmailCadastrarFuncionario = async (usuario, senha, emailUsuario, numeroRegistro) => {
  try {
    const conteudo = `
      <h3>Olá ${usuario},</h3>
      <p>Bem-vindo(a) à equipe <b>MusicHouse</b>!</p>
      <p>Aqui estão suas credenciais de acesso:</p>
      <p><b>Número de Registro:</b> <span style="color:#C1121F">${numeroRegistro}</span></p>
      <p><b>Senha Temporária:</b> <span style="color:#C1121F">${senha}</span></p>
      <p>Altere a senha no primeiro login.</p>
      <a href="${process.env.CLIENT_URL}/login"
         style="background:#C1121F;color:#fff;text-decoration:none;padding:12px 25px;border-radius:6px;display:inline-block;margin-top:10px;">
         Acessar Conta
      </a>
    `;

    await transport.sendMail({
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,//email do remetente
      to: emailUsuario, //email do funcionário
      subject: "Bem-vindo à equipe MusicHouse!", //assunto do email
      html: templateBase("Boas-vindas ao Time!", conteudo), //corpo do email em html
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de cadastro enviado!");
  } catch (err) {
    console.error("Erro ao enviar email de cadastro:", err);
  }
};


//enviar email para recuperação de senha
export const enviarEmailRecuperacao = async (emailUsuario, link) => {
  try {
    const conteudo = `
      <p>Recebemos uma solicitação para redefinir sua senha.</p>
      <p>Clique no botão abaixo para criar uma nova senha:</p>
      <a href="${link}"
         style="background:#C1121F;color:#fff;text-decoration:none;padding:12px 25px;border-radius:6px;display:inline-block;margin-top:10px;">
         Redefinir Senha
      </a>
      <p style="margin-top:15px;">Este link é válido por <b>1 hora</b>.</p>
      <p>Se você não solicitou a redefinição, ignore este e-mail.</p>
    `;

    await transport.sendMail({
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`, //email do remetente
      to: emailUsuario, //email do funcionário
      subject: "Redefinição de Senha – MusicHouse", //assunto do email
      html: templateBase("Recuperação de Senha", conteudo), //corpo do email em html
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de recuperação enviado!");
  } catch (err) {
    console.error("Erro ao enviar email de recuperação:", err);
  }
};


//email de confirmação de alteração de senha
export const enviarEmailConfirmacaoSenha = async (usuario, emailUsuario) => {
  try {
    const conteudo = `
      <h3>Olá ${usuario},</h3
      <p>Sua senha foi alterada com sucesso. </p>
      <p>Se não foi você, entre em contato com o suporte imediatamente.</p>
    `;

    await transport.sendMail({
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,//email do remetente
      to: emailUsuario,//email do funcionário
      subject: "Senha Redefinida com Sucesso – MusicHouse", //assunto do email
      html: templateBase("Confirmação de Senha", conteudo),//corpo do email em html
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de confirmação enviado!");
  } catch (err) {
    console.error("Erro ao enviar email de confirmação:", err);
  }
};
