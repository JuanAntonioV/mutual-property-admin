import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../../../components/wrappers/SectionWrapper';
import SectionHeader from '../../../components/headers/SectionHeader';
import { useState } from 'react';
import { createNewsApi } from '../../../api/news-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';

export default function CreateNewsPage() {
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

    const { mutate: createNews, isLoading: isCreateNewsLoading } = useMutation(
        createNewsApi,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title: form.title,
        };

        createNews(payload);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <SectionWrapper className={'mt-0 pb-10'}>
                    <SectionHeader
                        title='Create News'
                        detail='Menu ini digunakan untuk membuat berita terbaru'
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
                    </main>

                    <footer className='flex justify-end gap-4 pt-8 pb-2 mt-10 border-t border-borderPrimary'>
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
                            disabled={isCreateNewsLoading}
                        >
                            {isCreateNewsLoading ? (
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
