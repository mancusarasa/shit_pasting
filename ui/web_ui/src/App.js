import { useState } from 'react';

import LoginPage from './LoginPage.js'


export default function App() {
    const [authToken, setAuthToken] = useState(null);

    return (
        <>
            <LoginPage
                authToken={authToken}
                setAuthToken={setAuthToken}
            />
            {/*{(authToken !== null) && <p> logged in! </p>}*/}
        </>
    );
}
