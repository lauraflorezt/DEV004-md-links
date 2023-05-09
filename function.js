
import {default as fs} from 'fs';
import {default as path} from 'path';


// Función para validar si existe la ruta
const existPath = (paths) => fs.existsSync(paths); 

//Función para convertir la ruta a absoluta
const convertToAbsolute = (paths) => path.resolve(paths);

// Función para validar si es un directorio
const validateDirectory = (paths) => fs.statSync(paths).isDirectory();

// Función para validar si el archivo es .md y su extención
const existMdFile = (paths) => path.extname(paths) === ".md";

// Función para leer los archivos que están dentro de un directorio
function getAllFilesDirectory(path) {
    if (validateDirectory(path)) {
      const files = fs.readdirSync(path);
      return files
        .map((file) => {
          return getAllFilesDirectory(`${path}/${file}`);
        })
        .flat();
    } else {
      return [path];
    }
  }

export {
    existPath,
    convertToAbsolute,
    validateDirectory,
    existMdFile,
    getAllFilesDirectory
};