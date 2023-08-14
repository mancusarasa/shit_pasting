import { useReducer } from 'react';

import { AuthContext, AuthDispatchContext } from './AuthContext.js';

import LoginPage from './LoginPage.js'


export default function App() {
    const [authToken, dispatch] = useReducer(
        authReducer,
        null
    );

    return (
        <>
            <AuthContext.Provider value={authToken}>
                <AuthDispatchContext.Provider value={dispatch}>
                    <LoginPage/>
                    {(authToken !== null) && <p> logged in! </p>}
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
