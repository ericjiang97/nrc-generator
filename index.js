const inquirer = require('inquirer');
const fs = require('fs');
const choices = require('./choices')
const CHOICES = Object.values(choices)

const QUESTIONS = [
  {
    name: 'fileTypeChoice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'fileName',
    type: 'input',
    message: 'Enter component name:',
    validate:  (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'File name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const QUESTIONS_REACT_LIFECYCLE = [
  {
    name: 'constructor',
    type: 'confirm',
    message: 'Would you like a constructor?',
    default: true
}
]


inquirer.prompt(QUESTIONS)
  .then(answers => {
    generateComponent(answers.fileName, answers.fileTypeChoice)
});

const functionalComponent = componentName => `import React from 'react' 
export default ${componentName} = (props) => { 
    return (<div />)
}`



const reactComponent = (componentName,constructor) => `import React from 'react'

class ${componentName} extends React.Component {
    ${constructor ? `constructor(props){
        super(props);
        this.state = {
            
        }
    }` :  'state = {}'}
    render(){
        const { myProp } = this.props
        return(
            <div />
        )
    }
}

export default ${componentName}`

generateComponent = (fileName, reactType) => {
    switch(reactType){
        case choices.LIFECYCLE:
            // generate lifecycle (constructor, etc.)
            const path = './' + fileName+'.js'
            console.log('Generating lifecycle component')
            if (fs.existsSync(path)) {
                console.error('File Already Exists')
                break;
            }
            inquirer.prompt(QUESTIONS_REACT_LIFECYCLE)
                .then(answers => {
                    fs.writeFile(path, reactComponent(fileName, answers.constructor), err => {
                        console.error(err)
                    })
                })
            break;
        default:
            // generate functional class file
            console.log('Generating functional component')
            fs.writeFile('./' + fileName+'.js', functionalComponent(fileName), err => {
                console.error(err)
            })
            break;
            
    }
}