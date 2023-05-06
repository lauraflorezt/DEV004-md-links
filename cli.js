#!/usr/bin/env node  
//no es necesario escribir el comando node solo con ./cli.js

//import  mdLinks  from './index.js';
import chalk from 'chalk';
import process from 'process';


const path = process.argv[2]
const option1 = process.argv[3]
const option2 = process.argv[4]


if (path) {
  console.log(chalk.bgGreen.bold("----- MdLinks Comenzar ------"));
  console.log("Valor PATH: " + path)
  console.log("Valor Opción 1: " + option1)
  console.log("Valor Opción 2: " + option2)

  if (option1 === undefined && option2 === undefined) {
      //mdLinks(path, { validate: false, stats: false }).then(result => result)
  } else if (option1 === '--validate' && option2 === undefined) {
    console.log("Opción 2")
      //mdLinks(path, { validate: true, stats: false }).then(result => result)
  } else if (option1 === '--stats' && option2 === undefined) {
    console.log("Opción 3")
      //mdLinks(path, { validate: false, stats: true }).then(result => result)
  } else if ((option1 === '--validate' && option2 === '--stats') || (option1 === '--stats' && option2 === '--validate')) {
      //mdLinks(path, { validate: true, stats: true }).then(result => result)
      console.log("Opción 4")
  } else {
      console.log(chalk.bgRed.bold('------ ERROR: Verifique sus parámetros ------'))
    
  }
};
