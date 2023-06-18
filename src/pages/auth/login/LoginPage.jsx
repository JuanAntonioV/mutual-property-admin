import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { usernameRegex } from '@/utils/helpers';
import useAuth from '@/hooks/useAuth';
import useLogin from '@/hooks/api/useLogin';
import ErrorAlert from '@/components/alerts/ErrorAlert';

export default function LoginPage() {
    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();
    const [formError, setFormError] = useState(null);

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        if (name === 'username' && !value.match(usernameRegex)) {
            return;
        }

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { loginAction, isLoading, isError, error } = useLogin({
        successAction: (user, token) => {
            setUser(user);
            setToken(token);
            navigate('/dashboard', { replace: true });
        },
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setFormError(null);

        if (!formValues.username || !formValues.password) {
            setFormError('Mohon isi semua field');
            return;
        }

        loginAction(formValues);
    };

    return (
        <div className='relative flex flex-col items-center justify-center h-screen px-4 overflow-hidden'>
            <div className='w-full p-6 bg-white border-t-4 shadow-lg border-primary rounded-xl border-top lg:max-w-lg '>
                <header>
                    <h1 className='pt-2 pb-6 text-3xl font-semibold text-center text-primary'>
                        Mutual Property
                    </h1>
                </header>
                <main>
                    <ErrorAlert isError={isError} error={error} />
                    <ErrorAlert isError={formError} errorMessage={formError} />
                    <form className='space-y-4' onSubmit={handleLoginSubmit}>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='text-base label-text'>
                                    Username
                                </span>
                            </label>
                            <input
                                name='username'
                                type='text'
                                placeholder='Masukkan username'
                                className='w-full input input-bordered'
                                value={formValues.username}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='text-base label-text'>
                                    Password
                                </span>
                            </label>
                            <input
                                name='password'
                                type='password'
                                placeholder='Enter Password'
                                className='w-full input input-bordered'
                                value={formValues.password}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div>
                            <Link
                                to={'/forgot-password'}
                                className='mt-4 text-primary hover:underline hover:text-blue-600'
                            >
                                Forget Password?
                            </Link>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='btnPrimary'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <PulseLoader size={8} color='#fff' />
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
