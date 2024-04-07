import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from './Alert';

const LoginForm = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await login(user.email, user.password);
            navigate('/programacion-fumiplagasjr/home'); 
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate('/programacion-fumiplagasjr/home'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='w-full max-w-xs m-auto'>

            {error && <Alert message={error} />}

            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 text-sm font-fold mb-2'>Email: </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className='shadow appearance-none boeder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        onChange={handleChange}
                    />

                </div>

                <div className='mb-4'>

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="******"
                        className='shadow appearance-none boeder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        onChange={handleChange}
                    />
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type="submit">Iniciar</button>
            </form>

            <button className='bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full'
                onClick={handleGoogleSignin}> Google Login </button>
        </div>
    );
};

export default LoginForm;
