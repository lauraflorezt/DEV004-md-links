
import {default as fs} from 'fs';
import {default as path} from 'path';
import {default as chalk } from 'chalk';
import {default as axios } from 'axios';

// Función para validar si existe la ruta
const existPath = (paths) => fs.existsSync(paths); 

//Función para convertir la ruta a absoluta
const convertToAbsolute = (paths) => path.resolve(paths);

// Función para validar si es un directorio
const validateDirectory = (paths) => fs.statSync(paths).isDirectory(); // CUMPLE

// Función para obtener los archivos que están dentro de un directorio y una lista plana de todas las rutas 
function getAllFilesDirectory(path) {
  if (validateDirectory(path)) {
    const files = fs.readdirSync(path); //lee sincronicamente el contenido de un directorio
    return files
      .map((file) => {
        return getAllFilesDirectory(`${path}/${file}`);
      })
      .flat();
  } else {
    return [path];
  }
}

// Función para validar si el archivo es .md y su extención
const existMdFile = (paths) => path.extname(paths) === ".md";

//Variables con expresiones regulares 
const linksRegex = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig; 
const textRegex = /\[(\w+.+?)\]/gi;

//Función que permite obtener los links del documento MD
const getLinksDocument = (file, content) => {
  const arrayResponse = []
  if (!linksRegex.test(content)) { //valida las coincidencias con respecto a la expresión regular de texto, si es falsa
    console.log(chalk.bgRed.bold('------ ERROR: No existen enlaces en la ruta ' +  `${file}` + '------'))
    return [] // no se encontraron enlaces
  } else {//si se encuentran enlaces ejecuta
    const matches = content.match(linksRegex) // Obtiene las coincidencias de enlaces de las expresiones regulares
    matches.forEach((item) => {
      // console.log('Item Value:' + item)
      const matchesText = item.match(textRegex); // obtiene concidencias de texto 
      let unitText = "";
      let originText = ['No texto']
      if (matchesText) {
        //console.log(matchestext)
        unitText = matchesText[0];
        originText = unitText.replace(/\[|\]/g, '').split(',');
      }
      const matchesLink = item.match(urlRegex)
      //console.log('Matches link: ' + matchesLink)
      const unitLink = matchesLink[0];
      //console.log('Unit link: ' + unitLink)
      const originLink = unitLink.replace(/\(|\)/g, '').split(',');
      //console.log('Origin Link ' + originLink)

      arrayResponse.push({ href: originLink[0], text: originText[0], path: `${file}` })
    })
    return arrayResponse;
  }
}

// Función que se encarga de validar el array de los md encontrados 
const analyzeMdFilesArray = (mdFilesArray) => {
  const backupArray = []
  return new Promise((resolve, reject) => {
    mdFilesArray.forEach((file, index) => {
      fs.readFile(`${file}`, 'utf-8', (err, content) => {
        if (err) {
          reject(chalk.bgRed.bold('------ ERROR: Analizar archivos md. ------'));
        } else {
          backupArray.push(getLinksDocument(file, content));
          const merge = [].concat(...backupArray) // fusiona los elementos en un solo arreglo merge
          if (index === (mdFilesArray.length - 1)) {
            resolve(merge)
          }
        }
      });
    });
  });
}

//Función para obtener la estadistica cobre los enlaces de las opción Stats
const getStatsResult = (arrayObject) => {
  const arrayLink = arrayObject.map(element => element.href); //contiene las URl de los objetos 
  const uniqueLink = new Set(arrayLink);
  return {
    Total: arrayLink.length, //Longitud del arreglo / cantidad total de enlaces href
    Unique: uniqueLink.size // tamaño /cantidad de enlaces unicos 
  }
}

// Función que permite obtener los resultados --validate --stats
const getResultValidateStats = (arrayObject) => {
  const arrayLink = arrayObject.map(element => element.href); //contiene las URl de los objetos
  const uniqueLink = new Set(arrayLink);
  const brokenLink = arrayObject.filter(element => element.ok === 'fail')
  return {
    Total: arrayLink.length,
    Unique: uniqueLink.size,
    Broken: brokenLink.length // cantidad de enlaces rotos encontrados 
  }
}

// peticiones HTTP validacion de los links - entrega el objeto con status y ok
const getHttpResponse = (mdFilesArrayLink) => {
  const validate = mdFilesArrayLink.map((link) => {
    return axios.get(link.href) // devuelve una promesa que se resuelve con el resultad de la solicitud 
      .then((result) => { //objeto de respuesta exitosa de peticiones 
        const responseValidate = {
          ...link, // para agregar lo de link
          status: result.status,
          ok: result.statusText
        }
        return responseValidate
      })
      .catch((err) => {
        const responseValidate = {
          ...link,
          status: err.response ? 404 : 'ERROR', // objeto de error en la peticion 
          ok: "fail"
        }
        return responseValidate
      })
  })
  return Promise.all(validate)
}

export {
  existPath,
  existMdFile,
  convertToAbsolute,
  validateDirectory,
  getResultValidateStats,
  getAllFilesDirectory,
  analyzeMdFilesArray,  
  getHttpResponse,
  getStatsResult,
  getLinksDocument
};
