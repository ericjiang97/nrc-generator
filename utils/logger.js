const chalk = require('chalk');
const logger = console.log;
const errorLogger = console.error;

const CONSTANTS = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  DEV: 'DEVELOPMENT'
}

module.exports = {
  log: message => logger(chalk.blue.bold(CONSTANTS.INFO), message),
  error: message => errorLogger(chalk.red.bold(CONSTANTS.ERROR), message),
  dev: message => logger(chalk.cyan.bold(CONSTANTS.DEV), chalk.bold(message)),
  CONSTANTS
}