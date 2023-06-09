import { useState } from 'react';
import SectionHeader from '../../components/headers/SectionHeader';
import SectionWrapper from '../../components/wrappers/SectionWrapper';

import ProfilePlaceholder from '@/assets/img/profile.jpg';

export default function ProfilePage() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [profileForm, setProfileForm] = useState({
        picture: '',
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
    });

    const [changePasswordForm, setChangePasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const handleOnPasswordFormChange = (e) => {
        const { name, value } = e.target;

        setChangePasswordForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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

    const handleOnPasswordFormSubmit = (e) => {
        e.preventDefault();
        console.log('Change Password Form', changePasswordForm);
    };

    return (
        <>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                <div className='w-full col-span-2'>
                    <SectionWrapper className='mt-2'>
                        <SectionHeader
                            title='Profile'
                            detail='Detail informasi pengguna'
                        />

                        <main>
                            <div className='mb-6 avatar online'>
                                <div className='rounded-full w-44'>
                                    <img
                                        src={ProfilePlaceholder}
                                        alt='Profile Picture'
                                    />
                                </div>
                            </div>

                            <form
                                className='space-y-4'
                                onSubmit={handleOnProfileFormSubmit}
                            >
                                <div className='w-full form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Ganti Foto
                                        </span>
                                    </label>
                                    <input
                                        name='picture'
                                        type='file'
                                        className='w-full file-input file-input-bordered file-input-info'
                                        disabled={!isEditMode}
                                        onChange={handleOnProfileFormChange}
                                    />
                                    <label className='label'>
                                        <span className='label-text-alt'>
                                            Pastikan file yang anda upload
                                            sesuai
                                        </span>
                                        <span className='label-text-alt'>
                                            .jpg, .jpeg, .png up to 2MB
                                        </span>
                                    </label>
                                </div>

                                <div className='w-full form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Username
                                        </span>
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
                                        <span className='label-text'>
                                            Nama Lengkap
                                        </span>
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

                                <div>
                                    <p className='pb-3 mt-10 mb-4 font-semibold border-b'>
                                        Detail
                                    </p>
                                </div>

                                <div className='w-full form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Email
                                        </span>
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
                                        <span className='label-text'>
                                            Nomor Telepon
                                        </span>
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

                                <div className='space-x-4'>
                                    {isEditMode ? (
                                        <>
                                            <button
                                                type='button'
                                                className='mt-6 text-white bg-bgNegative border-bgNegative btn btn-primary hover:bg-bgNegative'
                                                onClick={() =>
                                                    setIsEditMode(false)
                                                }
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
                </div>

                <div className='w-full'>
                    <SectionWrapper className='mt-2'>
                        <SectionHeader
                            title='Ganti password'
                            detail='Fitur merubah password pengguna'
                        />

                        <main>
                            <form
                                className='space-y-4'
                                onSubmit={handleOnPasswordFormSubmit}
                            >
                                <div className='w-full form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Password lama
                                        </span>
                                    </label>
                                    <input
                                        name='oldPassword'
                                        type='password'
                                        placeholder='Masukkan password lama anda'
                                        className='w-full input input-bordered'
                                        required
                                        onChange={handleOnPasswordFormChange}
                                    />
                                </div>
                                <div className='w-full form-control'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Password baru
                                        </span>
                                    </label>
                                    <input
                                        name='newPassword'
                                        type='password'
                                        placeholder='Masukkan password baru anda'
                                        className='w-full input input-bordered'
                                        required
                                        onChange={handleOnPasswordFormChange}
                                    />
                                </div>

                                <div>
                                    <button
                                        type='submit'
                                        className='mt-6 text-white btn btn-primary bg-primary border-primary hover:bg-primary'
                                        disabled={
                                            changePasswordForm.oldPassword ===
                                                '' ||
                                            changePasswordForm.newPassword ===
                                                '' ||
                                            changePasswordForm.oldPassword
                                                .length <= 6 ||
                                            changePasswordForm.newPassword
                                                .length <= 6
                                        }
                                    >
                                        <span>Ganti</span>
                                    </button>
                                </div>
                            </form>
                        </main>
                    </SectionWrapper>
                </div>
            </div>
        </>
    );
}
