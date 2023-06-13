import { useState } from 'react';
import SectionHeader from '@/components/headers/SectionHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { FcInfo } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export default function CreateAdminPage() {
    const navigate = useNavigate();

    const [profileForm, setProfileForm] = useState({
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        role: '',
    });

    const handleOnProfileFormChange = (e) => {
        const { name, value } = e.target;

        setProfileForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnProfileFormSubmit = (e) => {
        e.preventDefault();
        console.log('Profile Form', profileForm);
    };
    return (
        <SectionWrapper>
            <SectionHeader
                title='Buat Admin Baru'
                detail='Menu ini digunakan untuk membuat admin baru'
            />

            <main>
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
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Nama Lengkap</span>
                        </label>
                        <input
                            name='fullName'
                            type='text'
                            placeholder='Masukkan nama lengkap anda'
                            className='w-full input input-bordered'
                            required
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
                            type='text'
                            placeholder='Masukkan email anda'
                            className='w-full input input-bordered'
                            required
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
                        <select className='select select-bordered'>
                            <option disabled selected>
                                Pilih Jabatan
                            </option>
                            <option>Admin</option>
                            <option>Marketing</option>
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
                            onChange={handleOnProfileFormChange}
                        />
                    </div>

                    <div className='pb-4 space-x-4'>
                        <button
                            type='button'
                            className='mt-6 btn'
                            onClick={() => navigate('/admins')}
                        >
                            <span>Batal</span>
                        </button>
                        <button
                            type='submit'
                            className='mt-6 text-white btn btn-success hover:bg-success/70 border-success hover:border-success/70'
                        >
                            <span>Buat</span>
                        </button>
                    </div>
                </form>
            </main>
        </SectionWrapper>
    );
}
