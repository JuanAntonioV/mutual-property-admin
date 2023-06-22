import { useEffect, useState } from 'react';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SectionHeader from '@/components/headers/SectionHeader';

import useAuth from '../../../hooks/useAuth';
import LazyImage from '../../../components/handler/LazyImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileApi } from '../../../api/admin-api';
import ErrorAlert from '../../../components/alerts/ErrorAlert';
import SuccessAlert from '../../../components/alerts/SuccessAlert';
import { PulseLoader } from 'react-spinners';

export default function ProfileSection() {
    const { token } = useAuth();

    const [isEditMode, setIsEditMode] = useState(false);
    const [profileImg, setProfileImg] = useState(null);
    const [profileForm, setProfileForm] = useState({
        photo: null,
        username: '',
        fullname: '',
        email: '',
        phone: '',
    });

    const handleOnProfileFormChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'photo') {
            setProfileForm((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        }

        setProfileForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageOnProfileFormChange = (e) => {
        const { files } = e.target;
        const uploaded = files[0];
        setProfileImg(URL.createObjectURL(uploaded));
        setProfileForm((prev) => ({
            ...prev,
            photo: uploaded,
        }));
    };

    const clearForm = () => {
        setProfileForm({
            username: user.username,
            fullname: user.detail.full_name,
            email: user.email,
            phone: user.detail.phone_number,
        });
    };

    const queryClient = useQueryClient();

    const {
        mutate: updateProfileAction,
        isLoading,
        isError,
        isSuccess,
        error,
        data: success,
    } = useMutation((payload) => updateProfileApi(payload), {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
            setIsEditMode(false);
        },
    });

    const handleOnProfileFormSubmit = (e) => {
        e.preventDefault();

        let data = {};

        if (profileForm.photo != user.photo) {
            data = {
                full_name: profileForm.fullname,
                phone_number: profileForm.phone,
                email: profileForm.email,
                photo: profileForm.photo,
            };
        } else {
            data = {
                full_name: profileForm.fullname,
                phone_number: profileForm.phone,
                email: profileForm.email,
            };
        }

        updateProfileAction({ data, token });
    };

    const { user } = useAuth();

    useEffect(() => {
        setProfileForm({
            username: user.username,
            fullname: user.detail.full_name,
            photo: user.photo,
            email: user.email,
            phone: user.detail.phone_number,
        });

        setProfileImg(user.photo);

        return () => {
            setProfileForm({
                picture: '',
                username: '',
                fullname: '',
                email: '',
                phone: '',
            });
            setProfileImg(null);
        };
    }, [user]);

    return (
        <SectionWrapper className='mt-2'>
            <SectionHeader title='Profile' detail='Detail informasi pengguna' />

            <main>
                <ErrorAlert isError={isError} error={error} />
                <SuccessAlert isSuccess={isSuccess} success={success} />

                <div className='mb-6 avatar online'>
                    <div className='rounded-full w-44 h-44'>
                        <LazyImage
                            src={profileImg}
                            className='!w-44 !h-44 !rounded-full'
                        />
                    </div>
                </div>

                <form
                    className='space-y-4'
                    onSubmit={handleOnProfileFormSubmit}
                >
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Ganti Foto</span>
                        </label>
                        <input
                            name='photo'
                            type='file'
                            className='w-full file-input file-input-bordered file-input-info'
                            disabled={!isEditMode}
                            accept='image/*'
                            onChange={handleImageOnProfileFormChange}
                        />
                        <label className='label'>
                            <span className='label-text-alt'>
                                Pastikan file yang anda upload sesuai
                            </span>
                            <span className='label-text-alt'>
                                .jpg, .jpeg, .png up to 2MB
                            </span>
                        </label>
                    </div>

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
                            value={profileForm.username}
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
                            disabled={!isEditMode}
                            value={profileForm.fullname}
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
                            disabled={!isEditMode}
                            value={profileForm.email}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Nomor Telepon</span>
                        </label>
                        <input
                            name='phone'
                            type='text'
                            placeholder='Masukkan nomor telepon anda'
                            className='w-full input input-bordered'
                            required
                            disabled={!isEditMode}
                            value={profileForm.phone}
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
                                        setIsEditMode(false) || clearForm()
                                    }
                                    disabled={isLoading}
                                >
                                    Batal
                                </button>
                                <button
                                    type='submit'
                                    className='mt-6 text-white btn btn-primary bg-primary border-primary hover:bg-primary'
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <PulseLoader size={8} color='#fff' />
                                    ) : (
                                        'Simpan'
                                    )}
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
