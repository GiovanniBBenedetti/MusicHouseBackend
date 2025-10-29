import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_AUTH_USER,
    pass: process.env.MAILER_AUTH_PASS,
  },
});

const templateBase = (titulo, conteudoHtml, iconeLucide) => `
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

const icons = {
  seguranca: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="#FDF0D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M9 12l2 2 4-4" /><path d="M12 22c7.732 0 10-10 10-10V5l-10-3-10 3v7s2.268 10 10 10z" /></svg>`,
  funcionario: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="#FDF0D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M17 21v-2a4 4 0 0 0-8 0v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  recuperar: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="#FDF0D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-reset"><path d="M3 11V7a5 5 0 0 1 9.9-1"/><path d="M12 11V7a5 5 0 0 1 9.9-1"/><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 19h.01"/></svg>`,
  confirmar: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="#FDF0D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
};



export const enviarEmailCodigo = async (usuario, codigo, emailUsuario) => {
  try {
    const conteudo = `
      <h3>Olá ${usuario},</h3>
      <p>Para proteger sua conta, utilize o código abaixo para realizar o login com autenticação de dois fatores (2FA):</p>
      <div style="background:#C1121F;color:#fff;font-size:24px;font-weight:bold;padding:12px 30px;border-radius:8px;display:inline-block;margin:20px 0;">
        ${codigo}
      </div>
      <p>Este código expira em <b>10 minutos</b>.</p>
      <p>Se você não solicitou esse código, ignore este e-mail ou contate o suporte imediatamente.</p>
    `;

    await transport.sendMail({
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,
      to: emailUsuario,
      subject: `${codigo} – Seu código de login MusicHouse`,
      html: templateBase("Verificação de Login 2FA", conteudo, icons.seguranca),
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de código enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar email de código:", err);
  }
};

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
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,
      to: emailUsuario,
      subject: "Bem-vindo à equipe MusicHouse!",
      html: templateBase("Boas-vindas ao Time!", conteudo, icons.funcionario),
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de cadastro enviado!");
  } catch (err) {
    console.error("Erro ao enviar email de cadastro:", err);
  }
};

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
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,
      to: emailUsuario,
      subject: "Redefinição de Senha – MusicHouse",
      html: templateBase("Recuperação de Senha", conteudo, icons.recuperar),
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de recuperação enviado!");
  } catch (err) {
    console.error("Erro ao enviar email de recuperação:", err);
  }
};

export const enviarEmailConfirmacaoSenha = async (usuario, emailUsuario) => {
  try {
    const conteudo = `
      <h3>Olá ${usuario},</h3
      <p>Sua senha foi alterada com sucesso. </p>
      <p>Se não foi você, entre em contato com o suporte imediatamente.</p>
    `;

    await transport.sendMail({
      from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,
      to: emailUsuario,
      subject: "Senha Redefinida com Sucesso – MusicHouse",
      html: templateBase("Confirmação de Senha", conteudo, icons.confirmar),
      attachments: [
        { filename: "logoEmail.png", path: "./templates/imgs/logoEmail.png", cid: "logoEmail" },
      ],
    });
    console.log("Email de confirmação enviado!");
  } catch (err) {
    console.error("Erro ao enviar email de confirmação:", err);
  }
};
