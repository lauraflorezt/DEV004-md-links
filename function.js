//import chalk from 'chalk';
import fs from 'fs'
import path from 'path'
//import axios from 'axios';

// Función para validar si existe la ruta
const existPath = (paths) => fs.existsSync(paths); 

//Función para convertir la ruta a absoluta
const convertToAbsolute = (paths) => path.resolve(paths);

// Función para validar si es un directorio
const validateDirectory = (paths) => fs.statSync(paths).isDirectory();

// Función para validar si el archivo es .md y su extención
const existMdFile = (paths) => path.extname(paths) === ".md";

export {
    existPath,
    convertToAbsolute,
    validateDirectory,
    existMdFile
};