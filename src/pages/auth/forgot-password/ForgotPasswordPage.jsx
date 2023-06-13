import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleFormChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };

    return (
        <div className='relative flex flex-col items-center justify-center h-screen px-4 overflow-hidden'>
            <div className='w-full p-6 bg-white border-t-4 shadow-lg border-primary rounded-xl border-top lg:max-w-lg '>
                <header>
                    <h1 className='pt-2 pb-6 text-2xl font-semibold text-primary'>
                        Forgot Password
                    </h1>
                </header>

                <main>
                    <form className='space-y-4'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='text-base label-text'>
                                    Email
                                </span>
                            </label>
                            <input
                                name='email'
                                type='text'
                                placeholder='Email Address'
                                className='w-full input input-bordered'
                                value={email}
                                onChange={handleFormChange}
                            />
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Enter your email address and we will send
                                    you a link to reset your password.
                                </span>
                            </label>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='w-full mt-6 btn btn-neutral bg-primary hover:bg-primaryHover'
                            >
                                Forgot Password
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
