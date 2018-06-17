const functionalComponent = (componentName, props = []) => {
    const useProps = props.length > 0
    return `import React from 'react' 
            export default ${componentName} = ({${useProps && props.join(', ')}}) => { 
                return (<div />)
            }`
}

module.exports = functionalComponent