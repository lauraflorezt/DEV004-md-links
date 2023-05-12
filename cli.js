#!/usr/bin/env node  
//no es necesario escribir el comando node solo con ./cli.js

import {mdLinks}  from './index.js';
import {default as chalk} from 'chalk';
import {default as process} from 'process';

const path = process.argv[2]
const option1 = process.argv[3]
const option2 = process.argv[4]

if (path) {
  console.log(chalk.bgMagenta.bold("----- MdLinks Comenzar ------"));
  if (option1 === undefined && option2 === undefined) {
    mdLinks(path, { validate: false, stats: false }).then(result => result)
  } else if (option1 === '--validate' && option2 === undefined) {
    mdLinks(path, { validate: true, stats: false }).then(result => result)
  } else if (option1 === '--stats' && option2 === undefined) {
    mdLinks(path, { validate: false, stats: true }).then(result => result)
  } else if ((option1 === '--validate' && option2 === '--stats') || (option1 === '--stats' && option2 === '--validate')) {
    mdLinks(path, { validate: true, stats: true }).then(result => result)
  } else {
    console.log(chalk.bgRed.bold('------ ERROR: Verifique su parámetro ------'))
  }
};
