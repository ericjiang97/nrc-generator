const PROPS_QUESTIONS = [{
  name: 'props',
  type: 'input',
  message: 'Enter props (comma seperated):',
  validate: (input) => {
    if (/[^,]+/.test(input)) return true;
    else return 'Props must be string and seperated using commas';
  }
}]

module.exports = PROPS_QUESTIONS