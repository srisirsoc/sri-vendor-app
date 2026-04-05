'use client';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import './login.form.css';
import Actions from '../../store/actions';
import { Context } from '../../store/store-provider';
import { AVendor } from '../../actions/a.vendor';


const LoginForm = () => {
    const [data, setData] = useState({ phone: '' });
    const [error, setError] = useState('');

    const { state: { loading }, dispatch } = useContext(Context);

    const InputHandler = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setData({ phone: value });

        if (value.length < 10) {
            setError('Enter a valid 10-digit mobile number');
        } else {
            setError('');
        }
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();
        if (data.phone.length !== 10) {
            setError('Enter a valid 10-digit mobile number');
            toast.error('Invalid mobile number');
            return;
        }

        try {
            dispatch({ type: Actions.loading, payload: true });
            dispatch({ type: Actions.data, payload: { phone: data.phone } });
            const { success, message } = await AVendor.Login(data.phone);
            if (success) {
                toast.success(message);
                dispatch({ type: Actions.model, payload: [true, "verify", null, true] });
            } else {
                toast.error(message || "Something went wrong!");
            }
        } catch (err) {
            toast.error(err.message || "Something went wrong!");
        } finally {
            dispatch({ type: Actions.loading, payload: false });
        }
    };

    return (
        <form className="login-card" onSubmit={SubmitHandler}>
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Login with your mobile number</p>

            <div className="input-group">
                <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={data.phone}
                    onChange={InputHandler}
                    required
                    placeholder=" "
                    disabled={loading}
                />
                <label>Mobile Number</label>
            </div>

            {error && <span className="error-text">{error}</span>}

            <button
                type="submit"
                className="login-btn"
                disabled={loading || !!error}
            >
                {loading ? 'Sending OTP...' : 'Continue'}
            </button>
        </form>
    );
};

export default React.memo(LoginForm);
