import { useState } from 'react';

import './LoginPage.css';


function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('typing');

    const handleSubmit = (event) => {
        event.preventDefault();
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
