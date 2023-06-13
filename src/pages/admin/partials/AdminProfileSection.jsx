import { useState } from 'react';

import SectionHeader from '@/components/headers/SectionHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';

import ProfilePlaceholder from '@/assets/img/profile.jpg';

import { FcInfo } from 'react-icons/fc';

export default function AdminProfileSection() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [profileForm, setProfileForm] = useState({
        picture: '',
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
                title='Detail Admin'
                detail='Menu ini digunakan untuk melihat detail admin'
            />

            <main>
                <div className='mb-6 avatar online'>
                    <div className='rounded-full w-44'>
                        <img src={ProfilePlaceholder} alt='Profile Picture' />
                    </div>
                </div>

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
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
                            onChange={handleOnProfileFormChange}
                        />
                        <label className='label'>
                            <span className='label-text-alt'>
                                Pastikan nama lengkap anda sesuai
                            </span>
                        </label>
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Status</span>
                        </label>
                        <select
                            className='select select-bordered'
                            disabled={!isEditMode}
                        >
                            <option disabled selected>
                                Pilih Status
                            </option>
                            <option>Aktif</option>
                            <option>Tidak Aktif</option>
                        </select>
                        <label className='label'>
                            <span className='label-text-alt'>
                                Dengan mengubah status menjadi tidak aktif, maka
                                user tidak dapat mengakses aplikasi
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
                            disabled={!isEditMode}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Nomor Telepon</span>
                        </label>
                        <input
                            name='phoneNumber'
                            type='text'
                            placeholder='Masukkan nomor telepon anda'
                            className='w-full input input-bordered'
                            required
                            disabled={!isEditMode}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Tanggal Masuk</span>
                        </label>
                        <input
                            name='joinDate'
                            type='date'
                            placeholder='Masukkan tanggal masuk'
                            className='w-full input input-bordered'
                            required
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
                        >
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

                    <div className='space-x-4'>
                        {isEditMode ? (
                            <>
                                <button
                                    type='button'
                                    className='mt-6 text-white bg-bgNegative border-bgNegative btn btn-primary hover:bg-bgNegative'
                                    onClick={() => setIsEditMode(false)}
                                >
                                    <span>Batal</span>
                                </button>
                                <button
                                    type='submit'
                                    className='mt-6 text-white btn btn-primary bg-primary border-primary hover:bg-primary'
                                >
                                    <span>Simpan</span>
                                </button>
                            </>
                        ) : (
                            <button
                                type='button'
                                className='mt-6 text-white bg-green-500 border-green-500 btn btn-primary hover:bg-green-500 hover:border-green-500'
                                onClick={() => setIsEditMode(true)}
                            >
                                <span>Ubah</span>
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </SectionWrapper>
    );
}
