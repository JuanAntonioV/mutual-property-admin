import { useState } from 'react';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SectionHeader from '@/components/headers/SectionHeader';
import { useMutation } from '@tanstack/react-query';
import { changePasswordApi } from '@/api/admin-api';
import useAuth from '@/hooks/useAuth';
import { PulseLoader } from 'react-spinners';
import SuccessAlert from '@/components/alerts/SuccessAlert';
import ErrorAlert from '@/components/alerts/ErrorAlert';

export default function ChangePasswordSection() {
    const { token } = useAuth();
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

    const {
        mutate: changePasswordAction,
        isLoading,
        isSuccess,
        isError,
        error,
        data: success,
    } = useMutation((payload) => changePasswordApi(payload));

    const handleOnPasswordFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            old_password: changePasswordForm.oldPassword,
            new_password: changePasswordForm.newPassword,
        };

        changePasswordAction({ data, token });
    };

    return (
        <SectionWrapper className='mt-2'>
            <SectionHeader
                title='Ganti password'
                detail='Fitur merubah password pengguna'
            />

            <main>
                <ErrorAlert isError={isError} error={error} />
                <SuccessAlert isSuccess={isSuccess} success={success} />
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
                            minLength={6}
                            value={changePasswordForm.oldPassword}
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
                            minLength={6}
                            value={changePasswordForm.newPassword}
                            onChange={handleOnPasswordFormChange}
                        />
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='mt-6 btnPrimary'
                            disabled={
                                changePasswordForm.oldPassword === '' ||
                                changePasswordForm.newPassword === '' ||
                                changePasswordForm.oldPassword.length <= 6 ||
                                changePasswordForm.newPassword.length <= 6
                            }
                        >
                            {isLoading ? (
                                <PulseLoader size={8} color='#fff' />
                            ) : (
                                'Ganti'
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </SectionWrapper>
    );
}
