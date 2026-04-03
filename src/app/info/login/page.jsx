import LoginForm from '@/components/forms/login.form'
import React from 'react';
import "./style.css";
import Container from '@/components/cards/container.card';

const page = () => {
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

export default page