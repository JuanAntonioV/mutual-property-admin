import { AiOutlineFileSearch } from 'react-icons/ai';
import StatusBadge from '../../components/badges/StatusBadge';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { dateFormater, textDotsFormat } from '../../utils/formaters';
import { PulseLoader } from 'react-spinners';
import { BiTrash } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteNewsApi, getAllNewsApi } from '../../api/news-api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewsPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedNewsId, setSelectedNewsId] = useState(null);

    const { data: newsData, isLoading: isNewsLoading } = useQuery(
        ['news'],
        getAllNewsApi,
        {
            select: (res) => res.results,
        }
    );

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

    const handleOpenDeleteModal = (id) => {
        setSelectedNewsId(id);
        window.deleteNewsModal.showModal();
    };

    const handleDeleteNewsClicked = () => {
        deleteNews(selectedNewsId);
    };

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Judul Berita',
                accessor: 'title',
            },
            {
                Header: 'Tanggal Posting',
                accessor: 'postedAt',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const data = useMemo(() => {
        let count = 1;
        return newsData
            ? newsData.map((item) => {
                  return {
                      count: count++,
                      title: textDotsFormat(item?.title, 40),
                      postedAt: dateFormater(item?.created_at),
                      status: <StatusBadge status={item?.is_active} />,
                      action: (
                          <div className='space-x-4'>
                              <button
                                  className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit'
                                  onClick={() => navigate(`${item.id}`)}
                              >
                                  <AiOutlineFileSearch size={20} />
                              </button>
                              <button
                                  className='bg-red-500 hover:bg-red-600 btn btn-sm hover:text-inherit'
                                  onClick={() => handleOpenDeleteModal(item.id)}
                                  disabled={isDeleteLoading}
                              >
                                  {isDeleteLoading ? (
                                      <PulseLoader size={10} color='#fff' />
                                  ) : (
                                      <BiTrash size={20} color='#fff' />
                                  )}
                              </button>
                          </div>
                      ),
                  };
              })
            : [];
    }, [newsData]);

    const handleAddNewsClicked = () => {
        navigate('/news/create');
    };

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

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='News'
                    detail='Semua list berita yang ada di website'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    addAction={handleAddNewsClicked}
                    isLoading={isNewsLoading}
                />
            </SectionWrapper>
        </>
    );
}
