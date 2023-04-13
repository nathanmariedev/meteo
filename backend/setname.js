#!/usr/bin/env node

/* eslint-disable no-console */
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const replace = require('replace-in-file');

const init = () => {
  console.log(chalk.green(figlet.textSync('Starterkit name changer', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })));
};

const askSettings = () => {
  const questions = [
    {
      name: 'NAME',
      type: 'input',
      message: 'Nom du projet, un mot, pas de majuscules',
    }
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  init();

  const answers = await askSettings();
  const { NAME } = answers;


  const options = {
    files: [
      'migrations/*',
      'seeds/*',
      'src/**/*',
      'test/*',
      `${__dirname}/*`
    ],
    ignore: [
      `${__dirname}/setname.js`
    ],
    from: [/starterkit/g, /Starterkit/g],
    to: [NAME.toLowerCase(), `${NAME.charAt(0).toUpperCase()}${NAME.slice(1)}`],
  };

  try {
    const results = await replace(options)
    console.log('Replacement results:', results);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
};

run();
