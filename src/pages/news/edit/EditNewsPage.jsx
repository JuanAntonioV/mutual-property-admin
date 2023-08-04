import { useNavigate, useParams } from 'react-router-dom';
import SectionWrapper from '../../../components/wrappers/SectionWrapper';
import SectionHeader from '../../../components/headers/SectionHeader';
import { useEffect, useState } from 'react';
import {
    deleteNewsApi,
    getNewssDetailApi,
    updateNewsApi,
} from '../../../api/news-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dateFormater } from '../../../utils/formaters';
import ScreenLoading from '../../../components/handler/ScreenLoading';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import { BiTrash } from 'react-icons/bi';

export default function EditNewsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        isActive: true,
        createdAt: '',
    });

    const queryClient = useQueryClient();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { isLoading, data: newsDetail } = useQuery(
        ['newsDetails', id],
        () => getNewssDetailApi(id),
        {
            refetchOnWindowFocus: false,
            enabled: !!id,
            cacheTime: 0,
            select: (res) => res.results,
            onSuccess: (res) => {
                setForm({
                    title: res?.title,
                    isActive: res?.is_active ? 1 : 0,
                    createdAt: res?.created_at,
                });
            },
            onError: (err) => {
                console.log(err);
                toast.error(err?.message ?? 'Gagal mendapatkan detail berita');
                navigate('/news');
            },
        }
    );

    useEffect(() => {
        if (newsDetail) {
            setForm({
                title: newsDetail?.title,
                isActive: newsDetail?.is_active ? 1 : 0,
                createdAt: newsDetail?.created_at,
            });

            return () => {
                setForm({
                    title: '',
                    isActive: 1,
                    createdAt: '',
                });
            };
        }
    }, [newsDetail]);

    const { mutate: deleteNews, isLoading: isDeleteLoading } = useMutation(
        (payload) => deleteNewsApi(payload),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('news');
                toast.success('Berhasil menghapus News');
                window.deleteNewsModal.close();
            },
        }
    );

    const { mutate: updateNews, isLoading: isUpdateNewsLoading } = useMutation(
        updateNewsApi,
        {
            onSuccess: () => {
                toast.success('Berhasil menyimpan berita');
                navigate(`/news`);
                queryClient.invalidateQueries('news');
            },
            onError: () => {
                toast.error('Gagal menyimpan berita');
                queryClient.invalidateQueries('news');
            },
        }
    );

    const handleOpenDeleteModal = () => {
        window.deleteNewsModal.showModal();
    };

    const handleDeleteNewsClicked = () => {
        deleteNews(id);
        navigate('/news');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title: form.title,
            is_active: parseInt(form.isActive) ? true : false,
        };

        updateNews({ id, payload });
    };

    if (isLoading) return <ScreenLoading />;

    return (
        <>
            <dialog id='deleteNewsModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <button
                            htmlFor='my-modal-3'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                        <h3 className='text-lg font-bold'>Hapus Berita</h3>
                    </header>
                    <main className='mt-5'>
                        <p className='text-base'>
                            Apakah anda yakin ingin menghapus berita ini?
                        </p>
                    </main>
                    <footer className='pt-4 modal-action'>
                        <button className='btn'>Batalkan</button>
                        <button
                            type='button'
                            className='text-white btn btn-error'
                            onClick={handleDeleteNewsClicked}
                            disabled={isDeleteLoading}
                        >
                            {isDeleteLoading ? (
                                <PulseLoader size={10} color='#fff' />
                            ) : (
                                'Hapus'
                            )}
                        </button>
                    </footer>
                </form>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>

            <form onSubmit={handleSubmit}>
                <SectionWrapper className={'mt-0 pb-10'}>
                    <SectionHeader
                        title='Edit News'
                        detail='Menu ini digunakan untuk mengedit News'
                    />

                    <main className='space-y-4'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>Message</span>
                            </label>
                            <input
                                name='title'
                                type='text'
                                placeholder='Masukkan Berita Terbaru'
                                className='w-full input input-bordered'
                                required
                                value={form.title}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Status{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <select
                                className='w-full select select-bordered'
                                name='isActive'
                                defaultValue={0}
                                value={form.isActive}
                                onChange={handleOnChange}
                            >
                                <option value={1}>Aktif</option>
                                <option value={0}>Tidak Aktif</option>
                            </select>
                        </div>

                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Tanggal Posting
                                </span>
                            </label>
                            <input
                                name='createdAt'
                                type='text'
                                disabled
                                placeholder='Diposting pada'
                                className='w-full input input-bordered'
                                required
                                value={dateFormater(form.createdAt)}
                            />
                        </div>
                    </main>

                    <footer className='flex justify-end gap-4 pt-8 pb-2 mt-10 border-t border-borderPrimary'>
                        <button
                            type='button'
                            className='text-white bg-red-600 btn hover:bg-red-700'
                            onClick={handleOpenDeleteModal}
                            disabled={isDeleteLoading}
                        >
                            {isDeleteLoading ? (
                                <PulseLoader size={8} color='#fff' />
                            ) : (
                                <BiTrash size={20} />
                            )}
                        </button>

                        <div className='h-12 w-[1px] bg-borderPrimary '></div>

                        <button
                            type='button'
                            className='text-white bg-gray-400 btn hover:bg-gray-500'
                            onClick={() => navigate('/news')}
                        >
                            Batalkan
                        </button>
                        <button
                            type='submit'
                            className='text-white btn btn-info'
                            disabled={isUpdateNewsLoading}
                        >
                            {isUpdateNewsLoading ? (
                                <PulseLoader size={8} color='#fff' />
                            ) : (
                                'Simpan'
                            )}
                        </button>
                    </footer>
                </SectionWrapper>
            </form>
        </>
    );
}
