import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Login form submitted', formValues);
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
                    <form className='space-y-4' onSubmit={handleLoginSubmit}>
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
                                value={formValues.email}
                                onChange={handleFormChange}
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
                                className='w-full mt-6 btn btn-neutral bg-primary hover:bg-primaryHover'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
