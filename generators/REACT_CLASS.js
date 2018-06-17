const REACT_LIFECYCLE_FUNCS = require('../questions/constants/LifeCycleFunctions')

const generateClassComponent = (componentName, constructor, props = [], lifeCycleFunctions) => {
    const useProps = props.length > 0
    const LifeCycleMode = {
        ComponentDidMount: lifeCycleFunctions.indexOf('ComponentDidMount')
    }
    return `import React from 'react'

  class ${componentName} extends React.Component {
      ${constructor ? `constructor(props){
          super(props);
          this.state = {
              
          }
      }` :  'state = {}'}
      ${(lifeCycleFunctions.indexOf(REACT_LIFECYCLE_FUNCS.ComponentDidMount) > -1 ) ? `componentDidMount = () => { }` : ''}
      ${(lifeCycleFunctions.indexOf(REACT_LIFECYCLE_FUNCS.ComponentDidUpdate) > -1) ? `componentDidUpdate = () => { }` : ''}
      ${(lifeCycleFunctions.indexOf(REACT_LIFECYCLE_FUNCS.getDerivedStateFromProps) > -1) ? `getDerivedStateFromProps = () => { }` : ''}
      render(){
          ${useProps && `const { ${props.join(', ')} } = this.props`}
          return(
              <div />
          )
      }
  }
  
  export default ${componentName}`
}

module.exports = generateClassComponent