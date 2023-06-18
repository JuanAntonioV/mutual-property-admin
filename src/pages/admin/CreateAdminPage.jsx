import { useState } from 'react';
import SectionHeader from '@/components/headers/SectionHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { FcInfo } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../components/alerts/ErrorAlert';
import useAuth from '../../hooks/useAuth';
import { PulseLoader } from 'react-spinners';

export default function CreateAdminPage() {
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');

    const [adminForm, setAdminForm] = useState({
        username: '',
        fullname: '',
        email: '',
        phoneNumber: '',
        role: '',
        is_active: true,
        password: '',
        passwordConfirmation: '',
    });

    const handleOnProfileFormChange = (e) => {
        const { name, value } = e.target;

        // create regex for the usename (only alphanumeric and underscore) and allow null
        const usernameRegex = /^[a-zA-Z0-9_]*$/;

        // create regex for the fullname (only alphabet) and allow null and space
        const fullnameRegex = /^[a-zA-Z ]*$/;

        if (
            (name === 'username' && !value.match(usernameRegex)) ||
            (name === 'fullname' && !value.match(fullnameRegex))
        ) {
            return;
        }

        setAdminForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { isLoading, isError, error, createUser } = useAuth();

    const handleOnProfileFormSubmit = async (e) => {
        e.preventDefault();

        if (
            adminForm.password !== adminForm.passwordConfirmation ||
            adminForm.password === '' ||
            adminForm.passwordConfirmation === ''
        ) {
            setFormError('Password dan konfirmasi password tidak sama');
            return;
        }

        await createUser({
            ...adminForm,
            successAction: () => navigate('/admins'),
        });
    };
    return (
        <SectionWrapper>
            <SectionHeader
                title='Buat Admin Baru'
                detail='Menu ini digunakan untuk membuat admin baru'
            />

            <main>
                <ErrorAlert isError={formError} errorMessage={formError} />
                <ErrorAlert isError={isError} errorMessage={error} />
                <form
                    className='space-y-4'
                    onSubmit={handleOnProfileFormSubmit}
                >
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Username</span>
                        </label>
                        <input
                            name='username'
                            type='text'
                            placeholder='Masukkan username anda'
                            className='w-full input input-bordered'
                            required
                            value={adminForm.username}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Nama Lengkap</span>
                        </label>
                        <input
                            name='fullname'
                            type='text'
                            placeholder='Masukkan nama lengkap anda'
                            className='w-full input input-bordered'
                            required
                            value={adminForm.fullname}
                            onChange={handleOnProfileFormChange}
                        />
                        <label className='label'>
                            <span className='label-text-alt'>
                                Pastikan nama lengkap anda sesuai
                            </span>
                        </label>
                    </div>

                    <div>
                        <p className='pb-3 mt-10 mb-4 font-semibold border-b'>
                            Detail
                        </p>
                    </div>

                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input
                            name='email'
                            type='email'
                            placeholder='Masukkan email anda'
                            className='w-full input input-bordered'
                            required
                            value={adminForm.email}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Nomor Telepon</span>
                        </label>
                        <input
                            name='phoneNumber'
                            type='number'
                            placeholder='Masukkan nomor telepon anda'
                            className='w-full input input-bordered'
                            required
                            value={adminForm.phoneNumber}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>

                    <div className='w-full form-control'>
                        <label className='label'>
                            <div className='flex items-center gap-2'>
                                <span className='label-text'>Jabatan</span>
                                <div
                                    className='tooltip tooltip-right tooltip-info '
                                    data-tip='Berfungsi untuk membatasi akses admin'
                                >
                                    <button className='mt-1.5'>
                                        <FcInfo size={20} />
                                    </button>
                                </div>
                            </div>
                        </label>
                        <select
                            className='select select-bordered'
                            name='role'
                            defaultValue={''}
                            onChange={handleOnProfileFormChange}
                        >
                            <option value={''} disabled>
                                Pilih Jabatan
                            </option>
                            <option value={'admin'}>Admin</option>
                            <option value={'marketing'}>Marketing</option>
                        </select>
                        <label className='label'>
                            <span className='label-text-alt'>
                                Pastikan jabatan yang anda pilih sesuai
                            </span>
                        </label>
                    </div>

                    <div>
                        <p className='pb-3 mt-10 mb-4 font-semibold border-b'>
                            Keamanan
                        </p>
                    </div>

                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Password</span>
                        </label>
                        <input
                            name='password'
                            type='password'
                            placeholder='Masukkan password'
                            className='w-full input input-bordered'
                            required
                            min={6}
                            value={adminForm.password}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Konfirmasi Password
                            </span>
                        </label>
                        <input
                            name='passwordConfirmation'
                            type='password'
                            placeholder='Masukkan ulang password'
                            className='w-full input input-bordered'
                            required
                            value={adminForm.passwordConfirmation}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>

                    <div className='pb-4 space-x-4'>
                        <button
                            type='button'
                            className='mt-6 btn'
                            onClick={() => navigate('/admins')}
                            disabled={isLoading}
                        >
                            <span>Batal</span>
                        </button>
                        <button
                            type='submit'
                            className='mt-6 text-white btn btn-success hover:bg-success/70 border-success hover:border-success/70'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <PulseLoader size={8} color='#fff' />
                            ) : (
                                'Simpan'
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </SectionWrapper>
    );
}
