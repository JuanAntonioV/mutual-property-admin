import { useMemo } from 'react';
import SectionHeader from '../../components/headers/SectionHeader';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { AiOutlineFileSearch } from 'react-icons/ai';
import MainTable from '../../components/tables/MainTable';
import { useNavigate } from 'react-router-dom';
import { BiCopy } from 'react-icons/bi';

export default function ProjectPage() {
    const navigate = useNavigate();

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Nama Developer',
                accessor: 'developerName',
            },
            {
                Header: 'Alamat Developer',
                accessor: 'developerAddress',
            },
            {
                Header: 'Total Unit',
                accessor: 'totalUnits',
            },
            {
                Header: 'Status',
                accessor: 'status',
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
                developerName: 'Rumah dijual di Jakarta',
                status: (
                    <span className='px-4 py-3 text-white badge bg-success'>
                        Aktif
                    </span>
                ),
                developerAddress: 'Jl. Jendral Sudirman No. 1',
                postedAt: '2021-08-20',
                totalUnits: '30',
                action: (
                    <div className='space-x-4'>
                        <div
                            className='tooltip tooltip-info tooltip-bottom'
                            data-tip='Copy Project ID'
                        >
                            <button className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit '>
                                <BiCopy size={20} />
                            </button>
                        </div>
                        <button className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit '>
                            <AiOutlineFileSearch size={20} />
                        </button>
                    </div>
                ),
            },
        ];
    }, []);

    const handleAddNewProject = () => {
        navigate('create');
    };

    return (
        <>
            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Project'
                    detail='Menu ini digunakan untuk mengelola data project yang ada di aplikasi.'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    addAction={handleAddNewProject}
                />
            </SectionWrapper>
        </>
    );
}
