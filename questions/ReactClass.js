const LIFECYCLE_FUNCTIONS = require('./constants/LifeCycleFunctions')
const QUESTIONS_REACT_LIFECYCLE = [{
    name: 'constructor',
    type: 'confirm',
    message: 'Would you like a constructor?',
    default: true
  },
  {
    name: 'lifeCycleFunctions',
    type: 'checkbox',
    message: 'Please select lifecycle functions you would want in your component',
    choices: [{
        name: LIFECYCLE_FUNCTIONS.ComponentDidMount
      },
      {
        name: LIFECYCLE_FUNCTIONS.ComponentDidUpdate
      },
      {
        name: LIFECYCLE_FUNCTIONS.getDerivedStateFromProps
      }
    ]
  }
]

module.exports = QUESTIONS_REACT_LIFECYCLE