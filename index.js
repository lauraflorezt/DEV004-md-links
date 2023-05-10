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
              console.log(chalk.bgYellow.bold('------ ADVERTENCIA: no hay archivos .md ------'));
            }
          }
        });
      } else {
        // Entra a validar cuando por el path se pasa el archivo .md: node cli.js ./testing/testConLinks01.md --validate --stats
        if(existMdFile(absolutePath)){ 
          mdFilesArray.push(absolutePath);
        }else{
           // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
            console.log(chalk.bgYellow.bold('------ ADVERTENCIA: no hay archivos .md ------'));          
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
              console.log(chalk.bgGreen.bold('------ Validación de análisis de resultados y estadísticas ------'))
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
              console.log(chalk.bgGreen.bold('------ Validar analisis de resultado ------'))
              console.log(validateLink)
            })
        });
    //Este es el proceso para realizar el proceso de Stats
    } else if (options.stats === true  && options.validate === false) {
      analyzeMdFilesArray(mdFilesArray)
        .then((result) => {
          const valueStats = getStatsResult(result)
          console.log(chalk.bgGreen.bold('------ Validar analisis de resultado ------'))
          console.log(valueStats)
          resolve(valueStats)
        });
    // Acá ingresa cuando no se tienen agregadas las banderas y se pasa unicamente el path
    } else {
      analyzeMdFilesArray(mdFilesArray)
        .then((result) => {
          const noOptions = result;
          resolve(noOptions)
          console.log(chalk.bgGreen.bold('------ Analisis de resultado DOCUMENTO md. -------'))
          console.log(noOptions)
        });
      }
    }else{
      console.log(chalk.bgRed.bold("------ ERROR: La Ruta no existe ------"));
    }
  }
)};
