  import bcrypt from "bcryptjs"


  //função para gerar uma senha aleatória
export default async function generatePassword() {
    var tamanho = 8,
    //caracteries que a senha pode ter
      caracteries =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      senha = '';
    for (var i = 0, n = caracteries.length; i < tamanho; ++i) {
    //gera a senha aleatória 
      senha += caracteries[Math.floor(Math.random() * n)];
    }
    return senha;
  }
  





  
generatePassword();


