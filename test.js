const generateRandomCommand = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos en el comando
    let prefijo = '\/'
    let command = '/'
  
    // Generar una cadena aleatoria de caracteres para el comando
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      prefijo += characters[randomIndex];
      command += characters[randomIndex];
    }
    
    let pattern = new RegExp(prefijo)
  
    return [command, pattern];
  };

console.log(generateRandomCommand())