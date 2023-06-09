import SectionWrapper from '@/components/wrappers/SectionWrapper';
import MainTable from '@/components/tables/MainTable';
import { useMemo } from 'react';

import { AiOutlineFileSearch } from 'react-icons/ai';
import SectionHeader from '../../../components/headers/SectionHeader';

export default function NewPostSection() {
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
                Header: 'Tipe Properti',
                accessor: 'type',
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
                type: 'Rumah',
                postedAt: '2021-08-20',
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

    return (
        <SectionWrapper>
            <SectionHeader
                title={'Property Terbaru'}
                detail={'List property terbaru yang ditambahkan'}
            />

            <MainTable data={data} columns={columns} />
        </SectionWrapper>
    );
}
