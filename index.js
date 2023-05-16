import {default as chalk} from 'chalk';

import {existPath,
  existMdFile,
  convertToAbsolute,
  validateDirectory,
  getResultValidateStats,
  getAllFilesDirectory,
  analyzeMdFilesArray,  
  getHttpResponse,
  getStatsResult
} from './function.js';
 
//Analizar archivos md en una determinada ruta y diferentes opciones 
 export const mdLinks = (path, options) => {
  
  return new Promise((resolve) => {
    let mdFilesArray = []; // Array vacio almacena los md. encontrados 
    if (existPath(path)){ // identifica si la ruta existe
      console.log(chalk.bgGreen.bold("------ INFO: la ruta existe ------"));
      const absolutePath = convertToAbsolute(path);// convertir a una ruta absoluta 
      // console.log('Resultado absolute path: ' + absolutePath);
      if(validateDirectory(absolutePath)){ // valida que el path sea de un directorio
        getAllFilesDirectory(absolutePath).forEach(file => { // getAllFilesDirectory obtiene los archivos que hay dentro del directorio
          console.log('Registros: ' + getAllFilesDirectory(absolutePath));
          if(existMdFile(file)){ // valida archivo por archivo para saber si es o no .MD
            mdFilesArray.push(file); // En caso de encontrarlo lo almacena en un array
          }else{
            if(mdFilesArray === []){ // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
              console.log(chalk.bgRed.bold('------ ERROR: no existe archivos .md ------'));
            }
          }
        });
      } else {
        // Entra a validar cuando por el path se pasa el archivo .md: node cli.js ./testing/archivo.md --validate --stats
        if(existMdFile(absolutePath)){ 
          mdFilesArray.push(absolutePath);
        }else{
           // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
            console.log(chalk.bgRed.bold('------ ERROR: no existe archivos .md ------'));          
        }
      }

    //--------------------------------------------------------------------------------------------
    //En esta sección comienza a validar los parámetros enviados: **--validate** y **--stats**
    //Este es el proceso para realizar el proceso de Validate y Stats ()
    if (options.validate === true && options.stats === true) {
      analyzeMdFilesArray(mdFilesArray)
        .then((result) => {
          getHttpResponse(result)
            .then((result) => {
              const resultValidateAndStats = getResultValidateStats(result)
              console.log(chalk.bgMagenta.bold('------ Validación de análisis de resultados y estadísticas ------'))
              console.log(resultValidateAndStats)
              resolve(resultValidateAndStats)
            })
        });

    //Este es el proceso para realizar el proceso de Validate
    } else if (options.validate === true && options.stats === false) {
      analyzeMdFilesArray(mdFilesArray)
        .then((result) => {
          getHttpResponse(result)
            .then((result) => {
              const validateLink = result
              resolve(validateLink)
              console.log(chalk.bgMagenta.bold('------ Validar analisis de resultado ------'))
              console.log(validateLink)
            })
        });

    //Este es el proceso para realizar el proceso de Stats
    } else if (options.stats === true  && options.validate === false) {
      analyzeMdFilesArray(mdFilesArray)
        .then((result) => {
          const valueStats = getStatsResult(result)
          console.log(chalk.bgMagenta.bold('------ Validar analisis de resultado ------'))
          console.log(valueStats)
          resolve(valueStats)
        });

    // Acá ingresa cuando no se tienen agregadas las banderas y se pasa unicamente el path
    } else {
      analyzeMdFilesArray(mdFilesArray)
        .then((result) => {
          const noOptions = result;
          resolve(noOptions)
          console.log(chalk.bgMagenta.bold('------ Analisis de resultado DOCUMENTO md. -------'))
          console.log(noOptions)
        });
      }
    }else{
      console.log(chalk.bgRed.bold("------ ERROR: La Ruta no existe ------"));
    }
  }
)};
