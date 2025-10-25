


export default async function generatePassword() {
    var tamanho = 8,
      caracteries =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      senha = '';
    for (var i = 0, n = caracteries.length; i < tamanho; ++i) {
      senha += caracteries[Math.floor(Math.random() * n)];
    }
    return senha;
  }
  
  
generatePassword();
