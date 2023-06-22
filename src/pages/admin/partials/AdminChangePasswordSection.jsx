import { useState } from 'react';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SectionHeader from '@/components/headers/SectionHeader';
import { useMutation } from '@tanstack/react-query';
import { changeAdminPasswordApi } from '../../../api/admin-api';
import { PulseLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorAlert from '../../../components/alerts/ErrorAlert';

export default function AdminChangePasswordSection() {
    const { id } = useParams();
    const [changePasswordForm, setChangePasswordForm] = useState({
        password: '',
        passwordConfirmation: '',
    });
    const [formError, setFormError] = useState('');

    const handleOnPasswordFormChange = (e) => {
        const { name, value } = e.target;

        setChangePasswordForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { mutate: changeAdminPasswordAction, isLoading } = useMutation(
        (payload) => changeAdminPasswordApi(payload),
        {
            onSuccess: () => {
                toast.success('Berhasil merubah password');
            },
            onError: () => {
                toast.error('Gagal merubah password');
            },
        }
    );

    const handleOnPasswordFormSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        if (
            changePasswordForm.password !=
            changePasswordForm.passwordConfirmation
        ) {
            setFormError('Konfirmasi password tidak sama');
            return;
        }

        const payload = {
            password: changePasswordForm.password,
            password_confirmation: changePasswordForm.passwordConfirmation,
        };

        changeAdminPasswordAction({ adminId: id, data: payload });
        setFormError('');
    };
    return (
        <SectionWrapper className='mt-2'>
            <SectionHeader
                title='Ganti password'
                detail='Fitur merubah password pengguna'
            />

            <main>
                <ErrorAlert isError={!!formError} errorMessage={formError} />

                <form
                    className='space-y-4'
                    onSubmit={handleOnPasswordFormSubmit}
                >
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Password baru</span>
                        </label>
                        <input
                            name='password'
                            type='password'
                            placeholder='Masukkan password baru'
                            className='w-full input input-bordered'
                            required
                            value={changePasswordForm.password}
                            onChange={handleOnPasswordFormChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Konfirmasi password
                            </span>
                        </label>
                        <input
                            name='passwordConfirmation'
                            type='password'
                            placeholder='Masukkan ulang password'
                            className='w-full input input-bordered'
                            required
                            value={changePasswordForm.passwordConfirmation}
                            onChange={handleOnPasswordFormChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='mt-6 text-white btn btn-primary bg-primary border-primary hover:bg-primary'
                            disabled={
                                changePasswordForm.password === '' ||
                                changePasswordForm.passwordConfirmation ===
                                    '' ||
                                changePasswordForm.password.length <= 6 ||
                                changePasswordForm.passwordConfirmation
                                    .length <= 6 ||
                                isLoading
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
