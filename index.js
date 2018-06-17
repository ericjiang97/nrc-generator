#!/usr/bin/env node

"use strict";

const inquirer = require('inquirer');
const fs = require('fs');
const choices = require('./choices')
const CHOICES = Object.values(choices)

const Logger = require('./utils/logger')

const INITIAL_QUESTIONS = require('./questions/initial')
const QUESTIONS_REACT_LIFECYCLE = require('./questions/ReactClass')
const QUESTIONS_PROPS = require('./questions/props')


const generateClassComponent = require('./generators/REACT_CLASS')
const functionalComponent = require('./generators/REACT_FUNCTIONAL')

inquirer.prompt(INITIAL_QUESTIONS)
    .then(answers => {
        generateComponent(answers.fileName, answers.fileTypeChoice, answers.props)
    });

const generateComponent = (fileName, reactType, useProps) => {
    switch (reactType) {
        case choices.LIFECYCLE:
            // generate lifecycle (constructor, etc.)
            const path = './' + fileName + '.js'
            Logger.log('Generating lifecycle component')

            if (fs.existsSync(path)) {
                Logger.error('File Already Exists. Exiting...')
                break;
            }
            inquirer.prompt(QUESTIONS_REACT_LIFECYCLE)
                .then(answers => {
                    Logger.dev(JSON.stringify(answers))
                    const lifeCycleFunctions = answers.lifeCycleFunctions
                    if (useProps) {
                        inquirer.prompt(QUESTIONS_PROPS).then(answers => {
                            const props = answers.props.split(',')
                            fs.writeFile(path, generateClassComponent(fileName, answers.constructor, props, lifeCycleFunctions), err => {
                                console.error(err)
                            })
                        })
                    } else {
                        fs.writeFile(path, generateClassComponent(fileName, answers.constructor, [], lifeCycleFunctions), err => {
                            console.error(err)
                        })
                    }
                })
            break;
        default:
            // generate functional class file
            Logger.log('Generating functional component')

            if (useProps) {
                inquirer.prompt(QUESTIONS_PROPS).then(answers => {
                    const props = answers.props.split(',')
                    fs.writeFile('./' + fileName + '.js', functionalComponent(fileName, props), err => {
                        if (err) {
                            Logger.error(err)
                        }
                        Logger.log('SUCCESFULLY CREATED COMPONENT')
                    })
                })
            } else {
                fs.writeFile('./' + fileName + '.js', functionalComponent(fileName), err => {
                    if (err) {
                        Logger.error(err)
                    }
                    Logger.log('SUCCESFULLY CREATED COMPONENT')
                })
            }
            break;

    }
}