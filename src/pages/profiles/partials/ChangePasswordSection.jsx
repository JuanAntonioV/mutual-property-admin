import { useState } from 'react';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SectionHeader from '@/components/headers/SectionHeader';

export default function ChangePasswordSection() {
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

    const handleOnPasswordFormSubmit = (e) => {
        e.preventDefault();
        console.log('Change Password Form', changePasswordForm);
    };

    return (
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
                            <span className='label-text'>Password lama</span>
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
                            <span className='label-text'>Password baru</span>
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
                                changePasswordForm.oldPassword === '' ||
                                changePasswordForm.newPassword === '' ||
                                changePasswordForm.oldPassword.length <= 6 ||
                                changePasswordForm.newPassword.length <= 6
                            }
                        >
                            <span>Ganti</span>
                        </button>
                    </div>
                </form>
            </main>
        </SectionWrapper>
    );
}
