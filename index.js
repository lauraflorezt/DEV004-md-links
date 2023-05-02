const chalk = require("chalk");

const fs = require("fs");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // identifica si la ruta existe
    if (fs.existsSync(path)){
    // chequear o convertir a una ruta absoluta 
    // Probar si esa ruta es un archivo o directorio
    // Si es un directorio filtrar los archivos md 
    }else{
    // si no existe la ruta rechaza la promesa
    reject("la ruta no existe");
    }
      
  });
};

module.exports = {
  mdLinks,
};
