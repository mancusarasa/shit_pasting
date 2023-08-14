import { useState } from 'react';

import './LoginPage.css';


function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authResult, setAuthResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const host = process.env.REACT_APP_AUTH_SERVICE_HOST;
        const port = process.env.REACT_APP_AUTH_SERVICE_PORT;
        const authServiceUrl = 'http://' + host + ':' + port + '/login'
        const response = await fetch(authServiceUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.json());
            }
            return response.json();
        })
        .catch(error => console.log(error));
        setAuthResult(response.auth_token);
        console.log(response)
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
