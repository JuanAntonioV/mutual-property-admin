import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordApi } from '@/api/auth-api';
import { PulseLoader } from 'react-spinners';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');

    const [formValue, setFormValue] = useState({
        password: '',
        passwordConfirmation: '',
    });

    const handleFormOnChange = (e) => {
        const { name, value } = e.target;

        setFormValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const {
        mutate: resetPasswordAction,
        isLoading,
        isError,
        error,
    } = useMutation((payload) => resetPasswordApi(payload), {
        onSuccess: (res) => {
            setFormError('');
            res.code === 200 && navigate('/login', { replace: true });
        },
        onError: () => {
            setFormError('');
        },
    });

    const handleResetPassword = (e) => {
        e.preventDefault();

        setFormError('');
        const email = searchParams.get('email');
        const token = searchParams.get('token');

        if (formValue.password != formValue.passwordConfirmation) {
            setFormError('Konfirmasi password tidak sama');
            return;
        } else if (
            formValue.password === '' ||
            formValue.passwordConfirmation === ''
        ) {
            setFormError('Password baru harus diisi');
            return;
        }

        const data = {
            email,
            token,
            ...formValue,
        };

        resetPasswordAction(data);
    };

    return (
        <div className='relative flex flex-col items-center justify-center h-screen px-4 overflow-hidden'>
            <div className='w-full p-6 bg-white border-t-4 shadow-lg border-primary rounded-xl border-top lg:max-w-lg '>
                <header>
                    <h1 className='pt-2 pb-6 text-2xl font-semibold text-primary'>
                        Reset Password
                    </h1>
                </header>

                <main>
                    <ErrorAlert isError={isError} error={error} />
                    <ErrorAlert isError={formError} errorMessage={formError} />

                    <form className='space-y-4' onSubmit={handleResetPassword}>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='text-base label-text'>
                                    Password
                                </span>
                            </label>
                            <input
                                name='password'
                                type='password'
                                placeholder='Masukkan password baru'
                                className='w-full input input-bordered'
                                value={formValue.password}
                                onChange={handleFormOnChange}
                                required
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='text-base label-text'>
                                    Konfirmasi password
                                </span>
                            </label>
                            <input
                                name='passwordConfirmation'
                                type='password'
                                placeholder='Masukkan ulang password'
                                className='w-full input input-bordered'
                                value={formValue.passwordConfirmation}
                                onChange={handleFormOnChange}
                                required
                            />
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
                                    'Reset Password'
                                )}
                            </button>
                        </div>
                    </form>
                </main>

                <footer>
                    <div className='flex items-center justify-center pb-2 mt-8 space-x-1'>
                        <span className='text-gray-600'>
                            Remember your password?
                        </span>
                        <Link
                            to={'/login'}
                            className='text-link hover:underline hover:text-blue-600'
                        >
                            Login
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
