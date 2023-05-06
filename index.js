//import chalk from 'chalk';
import { existPath,
  convertToAbsolute,
  validateDirectory,
  existMdFile
}from './function.js';

 export const mdLinks = (path, options) => {
  
  return new Promise((resolve) => {
    // Array vacio 
    let mdFilesArray = [];
    // identifica si la ruta existe
    if (existPath(path)){
      console.log(chalk.bgBlue.bold("------ INFO: la ruta existe ------"));
    // convertir a una ruta absoluta 
    const absolutePath = convertToAbsolute(path);
    // valida que el path sea de un directorio
    if(validateDirectory(absolutePath)){}
    // obtiene los archivos que hay dentro del directorio
    getAllFilesDirectory(absolutePath).forEach(file => {
    // valida archivo por archivo para saber si es o no .MD
      if(existMdFile(file)){ 
    // En caso de encontrarlo lo almacena en un array
        mdFilesArray.push(file); 
      }else{
        // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
        if(mdFilesArray === []){ 
          console.log(chalk.bgRed.bold('------ ERROR: sin archivos md. ------'));
        }
    
    // si no existe la ruta rechaza la promesa
    //reject("la ruta no existe");
    }
    })
  }
  
  })
  
};


// /https:\/\/[^\s]+/g