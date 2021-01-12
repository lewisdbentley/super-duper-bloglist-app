import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <div>
      <h2>Login form</h2>

      <form onSubmit={ handleSubmit }>
                username
        <input
          type="text"
          name="username"
          value={ username }
          onChange={handleUsernameChange}
        />
                password
        <input
          type="text"
          name="password"
          value={ password }
          onChange={handlePasswordChange}
        />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm