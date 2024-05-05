import { useReducer } from 'react';
import { Cookies } from 'react-cookie';

import { AuthContext, AuthDispatchContext } from './AuthContext.js';

import LoginPage from './LoginPage.js';
import AppRouter from './AppRouter.js'

const cookies = new Cookies();

export default function App() {
  const [authToken, dispatch] = useReducer(authReducer, cookies.get('auth_token'));

  return (
    <>
      <AuthContext.Provider value={authToken}>
        <AuthDispatchContext.Provider value={dispatch}>
          {authToken !== undefined ? <AppRouter/ > : <LoginPage/>}
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

function authReducer(authToken, action) {
  switch (action.type) {
    case 'logged_in': {
      cookies.set('auth_token', action.authToken);
      return action.authToken;
    }
    case 'logged_out': {
      cookies.remove('auth_token')
      return undefined;
    }
    default: {
      throw new Error('unknown action: ' + action.type);
    }
  }
}
