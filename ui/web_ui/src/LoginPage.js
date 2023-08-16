import { useState, useContext } from 'react';

import { AuthDispatchContext } from './AuthContext.js';

import './LoginPage.css';


function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useContext(AuthDispatchContext);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const host = process.env.REACT_APP_AUTH_SERVICE_HOST;
    const port = process.env.REACT_APP_AUTH_SERVICE_PORT;
    const authServiceUrl = 'http://' + host + ':' + port + '/login'
    await fetch(authServiceUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      username: username,
      password: password
    })
    }).then(response => {
      return response.json();
    }).then (jsonValue => {
      if (jsonValue.error) {
      setError(jsonValue.error);
      } else {
      setError(null);
      dispatch({
        type: 'logged_in',
        authToken: jsonValue.auth_token
      });
    }
    })
    .catch(error => {
      console.log('caught something?');
      setError(error);
    });
  };

  return (
    <div className="login-form">
      <div className="title"> Sign In </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="username-container">
            <label>Username</label>
            <input
              type="text"
              name="username"
              required
              onChange={
                (event) => setUsername(event.target.value)
              }
            />
          </div>
          <div className="password-container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={
                (event) => setPassword(event.target.value)
              }
            />
            {(error !== null) && <div className="error">{error}</div>}
          </div>
          <div className="button-container">
            <input type ="submit" value="Submit"/>
          </div>
        </form>
      </div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <>
      <div className="login-page">
        <LoginForm/>
      </div>
    </>
  );
}
