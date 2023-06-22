import { useEffect, useState } from 'react';

import SectionHeader from '@/components/headers/SectionHeader';
import SectionWrapper from '@/components/wrappers/SectionWrapper';

import { FcInfo } from 'react-icons/fc';
import LazyImage from '../../../components/handler/LazyImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAdminProfileApi } from '../../../api/admin-api';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function AdminProfileSection({ data }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [profileForm, setProfileForm] = useState({
        picture: '',
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        role: '',
        recruitmentDate: '',
        status: 0,
    });

    const handleOnProfileFormChange = (e) => {
        const { name, value } = e.target;

        setProfileForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        setProfileForm({
            picture: data?.photo,
            username: data?.username,
            fullName: data?.detail.full_name,
            email: data?.email,
            phoneNumber: data?.detail.phone_number,
            role: data?.detail.position,
            recruitmentDate: data?.detail?.recruitment_date,
            status: data?.status,
        });

        return () =>
            setProfileForm({
                picture: '',
                username: '',
                fullName: '',
                email: '',
                phoneNumber: '',
                role: '',
                recruitmentDate: '',
                status: false,
            });
    }, [data]);

    const queryClient = useQueryClient();

    const {
        mutate: updateAdminDetailAction,
        isLoading: isUpdateAdminDetailLoading,
    } = useMutation((payload) => updateAdminProfileApi(payload), {
        onSuccess: () => {
            queryClient.invalidateQueries('adminDetail');
            toast.success('Berhasil merubah data staff');
            setIsEditMode(false);
        },
        onError: () => {
            toast.error('Gagal merubah data staff');
        },
    });

    const handleOnProfileFormSubmit = (e) => {
        e.preventDefault();

        const payload = {
            full_name: profileForm.fullName,
            username: profileForm.username,
            recruitment_date: profileForm.recruitmentDate,
            position: profileForm.role,
            phone_number: profileForm.phoneNumber,
            email: profileForm.email,
            status: profileForm.status,
        };

        updateAdminDetailAction({ adminId: data?.id, data: payload });
    };

    return (
        <SectionWrapper className={'mt-2'}>
            <SectionHeader
                title='Detail Admin'
                detail='Menu ini digunakan untuk melihat detail admin'
            />

            <main>
                <div className='mb-6 avatar online'>
                    <LazyImage
                        src={data?.photo}
                        className='!rounded-full !w-44'
                    />
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
                            disabled={!isEditMode || isUpdateAdminDetailLoading}
                            value={profileForm.username}
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
                            disabled={!isEditMode || isUpdateAdminDetailLoading}
                            value={profileForm.fullName}
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
                            name='status'
                            className='select select-bordered'
                            disabled={!isEditMode || isUpdateAdminDetailLoading}
                            defaultValue={''}
                            value={profileForm.status}
                            onChange={handleOnProfileFormChange}
                        >
                            <option value={''} disabled>
                                Pilih Status
                            </option>
                            <option value={1}>Aktif</option>
                            <option value={0}>Tidak Aktif</option>
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
                            disabled={!isEditMode || isUpdateAdminDetailLoading}
                            value={profileForm.email}
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
                            disabled={!isEditMode || isUpdateAdminDetailLoading}
                            value={profileForm.phoneNumber}
                            onChange={handleOnProfileFormChange}
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Tanggal Masuk</span>
                        </label>
                        <input
                            name='recruitmentDate'
                            type='date'
                            placeholder='Masukkan tanggal masuk'
                            className='w-full input input-bordered'
                            required
                            disabled={!isEditMode || isUpdateAdminDetailLoading}
                            value={profileForm.recruitmentDate}
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
                            name='position'
                            className='select select-bordered'
                            disabled={!isEditMode || isUpdateAdminDetailLoading}
                            defaultValue={''}
                            value={profileForm.role}
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
                                    disabled={isUpdateAdminDetailLoading}
                                >
                                    {isUpdateAdminDetailLoading ? (
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
                                Ubah
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </SectionWrapper>
    );
}
