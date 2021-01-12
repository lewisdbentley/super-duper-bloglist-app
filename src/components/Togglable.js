import React, { useState, useImperativeHandle } from 'react'
import propTypes from 'prop-types'


const Togglable = React.forwardRef(( props, ref ) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }

  const toggleVisibility = () => {
    setLoginVisible(!loginVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
}

export default Togglable