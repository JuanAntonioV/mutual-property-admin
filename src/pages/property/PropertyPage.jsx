import { useMemo, useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePropertyApi, getAllPropertyApi } from '../../api/property-api';
import { dateFormater, textDotsFormat } from '../../utils/formaters';
import CategoryBadge from '../../components/badges/CategoryBadge';
import useStore from '../../hooks/useStore';
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';

export default function PropertyPage() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);
    const { categories } = useStore();
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const queryClient = useQueryClient();

    const { data: propertyData, isLoading: isPropertyLoading } = useQuery(
        ['property'],
        getAllPropertyApi,
        {
            select: (res) => res.results,
        }
    );

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Nama Properti',
                accessor: 'propertyName',
            },
            {
                Header: 'Categori Properti',
                accessor: 'category',
            },
            {
                Header: 'Tipe Properti',
                accessor: 'type',
            },
            {
                Header: 'Nama Marketing',
                accessor: 'marketingName',
            },
            {
                Header: 'Tanggal Posting',
                accessor: 'postedAt',
            },
            {
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const { mutate: deleteProperty, isLoading: isDeleteLoading } = useMutation(
        (payload) => deletePropertyApi(payload),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('property');
                toast.success('Berhasil menghapus property');
            },
        }
    );

    const handleDeletePropertyClicked = (id) => {
        setSelectedPropertyId(id);
        window.deletePropertyModal.showModal();
    };

    const handleDeletePropertyModal = () => {
        deleteProperty(selectedPropertyId);
        window.deletePropertyModal.close();
    };

    const data = useMemo(() => {
        let count = 1;
        return propertyData
            ? propertyData.map((item) => {
                  return {
                      count: count++,
                      propertyName: textDotsFormat(item?.title, 20),
                      category: (
                          <CategoryBadge
                              status={item?.category.id}
                              statusText={item?.category?.name}
                          />
                      ),
                      type: item?.sub_category?.name,
                      postedAt: dateFormater(item?.created_at),
                      marketingName: item?.staff_details?.full_name,
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
                                  onClick={() =>
                                      handleDeletePropertyClicked(item.id)
                                  }
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
    }, [propertyData]);

    const handleAddNewProperty = () => {
        window.stepOne.showModal();
    };

    const handleSubmitCategory = () => {
        setError(false);

        if (!category) {
            setError(true);
        } else {
            setError(false);
            navigate(`/property/create/${category}`);
        }
    };

    return (
        <>
            <dialog id='stepOne' className='modal'>
                <form method='dialog' className='space-y-6 modal-box'>
                    <header>
                        <button
                            htmlFor='stepOne'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                        <h3 className='text-lg font-bold'>
                            Pilih Category Properti
                        </h3>
                    </header>
                    <main>
                        <form className='space-y-4'>
                            <div className='form-control'>
                                <label htmlFor='category' className='label'>
                                    <span className='text-base label-text'>
                                        Properti
                                    </span>
                                </label>
                                <select
                                    name='category'
                                    id='category'
                                    className={`select input-bordered ${
                                        error ? 'input-error' : ''
                                    }`}
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setError(false);
                                    }}
                                    required
                                >
                                    <option value='' disabled>
                                        Pilih Category
                                    </option>
                                    {categories &&
                                        categories?.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.name.toLowerCase()}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                                <label className='label'>
                                    {error ? (
                                        <span className='label-text-alt text-error'>
                                            Category properti harus diisi
                                        </span>
                                    ) : (
                                        <span className='label-text-alt'>
                                            Silahkan pilih category properti
                                            sebelum melanjutkan
                                        </span>
                                    )}
                                </label>
                            </div>
                        </form>
                    </main>
                    <footer>
                        <div className='modal-action'>
                            <button className='text-white btn btn-error'>
                                Cancel
                            </button>
                            <button
                                type='button'
                                className='text-white btn btn-info'
                                onClick={handleSubmitCategory}
                            >
                                Selanjutnya
                            </button>
                        </div>
                    </footer>
                </form>
            </dialog>

            <dialog id='deletePropertyModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <button
                            htmlFor='my-modal-3'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                        <h3 className='text-lg font-bold'>Hapus Properti</h3>
                    </header>
                    <main className='mt-5'>
                        <p className='text-base'>
                            Apakah anda yakin ingin menghapus properti ini?
                        </p>
                    </main>
                    <footer className='pt-4 modal-action'>
                        <button className='btn'>Batalkan</button>
                        <button
                            type='button'
                            className='text-white btn btn-error'
                            onClick={handleDeletePropertyModal}
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
                    title='Property'
                    detail='Semua list property yang di posting'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    addAction={handleAddNewProperty}
                    isLoading={isPropertyLoading}
                />
            </SectionWrapper>
        </>
    );
}
