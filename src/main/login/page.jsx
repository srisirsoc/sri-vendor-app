import React from 'react';
import "./style.css";
import Container from '../../components/cards/container.card';
import LoginForm from '../../components/forms/login.form';

const LoginPage = () => {
    return (
        <Container>
            <div className="login-main">
                <div className='login-page'>
                    <LoginForm />
                </div>
            </div>
        </Container>
    )
}

export default LoginPage