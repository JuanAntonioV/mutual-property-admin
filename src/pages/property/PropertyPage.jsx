import { useMemo, useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import { useNavigate } from 'react-router-dom';

export default function PropertyPage() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);

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

    const data = useMemo(() => {
        let count = 1;
        return [
            {
                count: count++,
                propertyName: 'Rumah dijual di Jakarta',
                category: (
                    <span className='px-4 py-3 text-white badge bg-success'>
                        Baru
                    </span>
                ),
                type: 'Rumah',
                postedAt: '2021-08-20',
                marketingName: 'Joseph michael',
                action: (
                    <div className='space-x-4'>
                        <button className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit '>
                            <AiOutlineFileSearch size={20} />
                        </button>
                    </div>
                ),
            },
            {
                count: count++,
                propertyName: 'Rumah dijual di Medan ',
                category: (
                    <span className='px-4 py-3 text-white badge bg-info'>
                        Dijual
                    </span>
                ),
                type: 'Ruko',
                postedAt: '2022-08-20',
                marketingName: 'Joseph michael',
                action: (
                    <div className='space-x-4'>
                        <button className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit '>
                            <AiOutlineFileSearch size={20} />
                        </button>
                    </div>
                ),
            },
        ];
    }, []);

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
                            htmlFor='my-modal-3'
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
                                    <option value='baru'>Baru</option>
                                    <option value='dijual'>Dijual</option>
                                    <option value='disewa'>Disewa</option>
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

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Property'
                    detail='Semua list property yang di posting'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    addAction={handleAddNewProperty}
                />
            </SectionWrapper>
        </>
    );
}
