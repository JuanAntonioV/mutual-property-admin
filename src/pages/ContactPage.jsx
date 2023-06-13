import { useMemo, useState } from 'react';
import SectionHeader from '../components/headers/SectionHeader';
import MainTable from '../components/tables/MainTable';
import SectionWrapper from '../components/wrappers/SectionWrapper';
import { AiOutlineFileSearch } from 'react-icons/ai';

export default function ContactPage() {
    const [selectedData, setSelectedData] = useState(null);

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Nama Lengkap',
                accessor: 'fullName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Pesan',
                accessor: 'message',
            },
            {
                Header: 'Tanggal Subscription',
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
                fullName: 'Rendy Artha P',
                email: 'jiwarumah@gmail.com',
                message: 'Saya tertarik dengan properti ini, bisa dihubungi?',
                postedAt: '2021-08-20',
                action: (
                    <div className='flex flex-row gap-2'>
                        <button
                            className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit '
                            onClick={() => handleViewDetail(0)}
                        >
                            <AiOutlineFileSearch size={20} />
                        </button>
                    </div>
                ),
            },
        ];
    }, []);

    const handleViewDetail = (id) => {
        setSelectedData(data[id]);
        window.contactDetailModal.showModal();
    };

    return (
        <>
            <dialog id='contactDetailModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <h3 className='text-lg font-bold'>Detail Pesan</h3>
                        <button
                            htmlFor='contactDetailModal'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                    </header>
                    <main className='py-4'>
                        <p>
                            Saya tertarik dengan properti ini, bisa dihubungi?
                        </p>
                    </main>
                    <footer className='modal-action'>
                        <button className='btn'>Close</button>
                    </footer>
                </form>
            </dialog>

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Contact'
                    detail='Semua list user yang mengirimkan pesan lewat contact form'
                />

                <MainTable data={data} columns={columns} />
            </SectionWrapper>
        </>
    );
}
