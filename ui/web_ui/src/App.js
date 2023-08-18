import { useReducer } from 'react';

import { AuthContext, AuthDispatchContext } from './AuthContext.js';

import LoginPage from './LoginPage.js';
import AppRouter from './AppRouter.js'


export default function App() {
  const [authToken, dispatch] = useReducer(authReducer, null);

  return (
    <>
      <AuthContext.Provider value={authToken}>
        <AuthDispatchContext.Provider value={dispatch}>
          {authToken !== null ? <AppRouter/ > : <LoginPage/>}
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

function authReducer(authToken, action) {
  switch (action.type) {
    case 'logged_in': {
      return action.authToken;
    }
    case 'logged_out': {
      return null;
    }
    default: {
      throw new Error('unknown action: ' + action.type);
    }
  }
}
