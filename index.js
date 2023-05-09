import {default as chalk} from 'chalk';
import { existPath,
  convertToAbsolute,
  validateDirectory,
  existMdFile,
  getAllFilesDirectory
} from './function.js';

 export const mdLinks = (path, options) => {
  
  return new Promise((resolve) => {
    // Array vacio 
    let mdFilesArray = [];
    // identifica si la ruta existe
    if (existPath(path)){
      console.log(chalk.bgBlue.bold("------ INFO: la ruta existe ------"));
      // convertir a una ruta absoluta 
      const absolutePath = convertToAbsolute(path);
     // console.log('Resultado absolute path: ' + absolutePath);
      // valida que el path sea de un directorio
    if(validateDirectory(absolutePath)){
      console.log('Registros: ' + getAllFilesDirectory(absolutePath));
      getAllFilesDirectory(absolutePath).forEach(file => { // readAllFilesRecursive obtiene los archivos que hay dentro del directorio
        if(existMdFile(file)){ // valida archivo por archivo para saber si es o no .MD
          mdFilesArray.push(file); // En caso de encontrarlo lo almacena en un array
        }else{
          if(mdFilesArray === []){ // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
            console.log(chalk.bgYellow.bold('---------- WARNING: no .md files ----------'));
          }
        }
        
      });
    }
    // obtiene los archivos que hay dentro del directorio
    console.log('Resultado de validar el directorio: ' +validateDirectory(absolutePath))
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