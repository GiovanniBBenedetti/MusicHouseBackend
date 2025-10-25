import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()



const enviarEmailCodigo = async (Usuario, codigo, emailUsuario) => {


    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_AUTH_USER,
            pass: process.env.MAILER_AUTH_PASS, 
        }
    });

    try {
        const info = await transport.sendMail({
            from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,
            to: `${emailUsuario}`,
            subject: `${codigo} – Seu código de login do MusicHouse`,
            text: "Código de login",
            html: `<!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f6f9; color: #333; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; background-color: #C1121F; padding: 20px; border-radius: 8px 8px 0 0;">
        <img src="cid:logoEmail" alt="Logo" style="width: 200px;">
        <h2 style="color: #fff; margin-top: 10px;">Verificação de Login com Autenticação de Dois Fatores</h2>
      </div>
      <div style="text-align: center; padding: 20px;">
        <h3 style="font-size: 18px; margin-bottom: 10px; color: #131312;">Olá ${Usuario},</h3>
        <p style="color: #131312;">Para melhorar a segurança da sua conta, estamos solicitando a autenticação de dois fatores para acessar sua conta. Aqui está o seu código 2FA:</p>
        <div style="font-size: 24px; background-color: #C1121F; padding: 10px 20px; border-radius: 6px; margin: 20px 0; font-weight: bold; color: #fff;">
          ${codigo}
        </div>
        <p style="color: #131312;">Este código expirará em 10 minutos.</p>
        <p style="color: #131312;">Por favor, insira este código na tela de login para acessar sua conta. Se você não solicitou esse código ou se não está tentando acessar sua conta, entre em contato conosco imediatamente para suporte.</p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://www.instagram.com" style="color: #C1121F; text-decoration: none; margin: 0 10px;">Instagram</a>
          <a href="https://www.facebook.com" style="color: #C1121F; text-decoration: none; margin: 0 10px;">Facebook</a>
        </div>
      </div>
      <div style="background-color: #C1121F; padding: 10px; text-align: center; border-radius: 0 0 8px 8px;">
        <p style="color: #fff; margin: 0;">Política de Privacidade | Contate-nos | Cancelar inscrição</p>
      </div>
    </div>
  </body>
  </html>`,
            attachments: [
                {
                    filename: 'logoEmail.png',
                    path: './templates/imgs/logoEmail.png',
                    cid: 'logoEmail',
                }
            ]
        });
        console.log('E-mail enviado com sucesso, resposta: ', info);
    } catch (error) {
        console.log('Erro ao enviar e-mail: ', error);
    }
};






const enviarEmailCadastrarFuncionario = async (Usuario, senha, emailUsuario, numeroRegistro) =>{
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_AUTH_USER,
            pass: process.env.MAILER_AUTH_PASS, 
        }
    });



        try {
        const info = await transport.sendMail({
            from: `MusicHouse <${process.env.MAILER_AUTH_USER}>`,
            to: `${emailUsuario}`,
            subject: `Bem-vindo a família MusicHouse`,
            text: "Cadastro de funcionário",
            html: `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f9; color: #333; margin: 0; padding: 0;">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; background-color: #C1121F; padding: 20px; border-radius: 8px 8px 0 0;">
      <img src="cid:logoEmail" alt="Logo" style="width: 200px;">
      <h2 style="color: #fff; margin-top: 10px;">Informações de Acesso para a Sua Conta</h2>
    </div>
    <div style="text-align: center; padding: 20px;">
      <h3 style="font-size: 18px; margin-bottom: 10px; color: #131312;">Olá ${Usuario},</h3>
      <p style="color: #131312;">Você foi registrado no sistema da empresa. Aqui estão suas informações de login:</p>
      <div style="font-size: 18px; font-weight: bold; margin: 20px 0;">
        <p style="color: #131312;">Número de registro: <span style="color: #C1121F;">${numeroRegistro}</span></p>
        <p style="color: #131312;">Senha Temporária: <span style="color: #C1121F;">${senha}</span></p>
      </div>
      <p style="color: #131312;">Por motivos de segurança, você será solicitado a alterar sua senha após o primeiro acesso.</p>
      <p style="color: #131312;">Caso você não tenha realizado esse cadastro ou tenha alguma dúvida, entre em contato com o suporte imediatamente.</p>
      <p style="color: #131312;">Acesse o portal clicando no link abaixo:</p>
      <div style="text-align: center; margin-top: 20px;">
        <a style="background-color: #C1121F; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Acessar a Conta</a>
      </div>
    </div>
    <div style="background-color: #C1121F; padding: 10px; text-align: center; border-radius: 0 0 8px 8px;">
      <p style="color: #fff; margin: 0;">Política de Privacidade | Contate-nos | Cancelar inscrição</p>
    </div>
  </div>
</body>
</html>
`,
            attachments: [
                {
                    filename: 'logoEmail.png',
                    path: './templates/imgs/logoEmail.png',
                    cid: 'logoEmail',
                }
            ]
        });
        console.log('E-mail enviado com sucesso, resposta: ', info);
    } catch (error) {
        console.log('Erro ao enviar e-mail: ', error);
    }


}

export {enviarEmailCodigo, enviarEmailCadastrarFuncionario}
