#!/usr/bin/env node

"use strict";

const inquirer = require('inquirer');
const fs = require('fs');
const choices = require('./choices')
const CHOICES = Object.values(choices)

const INITIAL_QUESTIONS = require('./questions/initial')
const QUESTIONS_REACT_LIFECYCLE = require('./questions/ReactClass')
const QUESTIONS_PROPS = require('./questions/props')



inquirer.prompt(INITIAL_QUESTIONS)
    .then(answers => {
        generateComponent(answers.fileName, answers.fileTypeChoice)
    });

const functionalComponent = componentName => `import React from 'react' 
export default ${componentName} = (props) => { 
    return (<div />)
}`



const reactComponent = (componentName, constructor, props) => {
    const useProps = props.length > 0
    return `import React from 'react'

    class ${componentName} extends React.Component {
        ${constructor ? `constructor(props){
            super(props);
            this.state = {
                
            }
        }` :  'state = {}'}
        render(){
            ${useProps && `const { ${props.join(', ')} } = this.props`}
            return(
                <div />
            )
        }
    }
    
    export default ${componentName}`
}

const generateComponent = (fileName, reactType) => {
    switch (reactType) {
        case choices.LIFECYCLE:
            // generate lifecycle (constructor, etc.)
            const path = './' + fileName + '.js'
            console.log('Generating lifecycle component')

            const LIFECYCLE_ANSWERS = {}

            if (fs.existsSync(path)) {
                console.error('File Already Exists')
                break;
            }
            inquirer.prompt(QUESTIONS_REACT_LIFECYCLE)
                .then(answers => {
                    if (answers.props) {
                        inquirer.prompt(QUESTIONS_PROPS).then(answers => {
                            const props = answers.props.split(',')
                            fs.writeFile(path, reactComponent(fileName, answers.constructor, props), err => {
                                console.error(err)
                            })
                        })
                    } else {
                        fs.writeFile(path, reactComponent(fileName, answers.constructor, props = []), err => {
                            console.error(err)
                        })
                    }
                })
            break;
        default:
            // generate functional class file
            console.log('Generating functional component')
            fs.writeFile('./' + fileName + '.js', functionalComponent(fileName), err => {
                console.error(err)
            })
            break;

    }
}