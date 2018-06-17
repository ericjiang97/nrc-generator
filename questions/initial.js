const choices = require('../choices')
const CHOICES = Object.values(choices)

const INITAL_QUESTIONS = [{
    name: 'fileTypeChoice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'fileName',
    type: 'input',
    message: 'Enter component name:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'File name may only include letters, numbers, underscores and hashes.';
    }
  }, {
    name: 'props',
    type: 'confirm',
    message: 'Would you like props in your component?',
    default: false
  }
];

module.exports = INITAL_QUESTIONS