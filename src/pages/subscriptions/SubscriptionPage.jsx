import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { useMemo } from 'react';

export default function SubscriptionPage() {
    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Tanggal Subscription',
                accessor: 'postedAt',
            },
        ],
        []
    );

    const data = useMemo(() => {
        let count = 1;
        return [
            {
                count: count++,
                email: 'jiwarumah@gmail.com',
                postedAt: '2021-08-20',
            },
        ];
    }, []);

    return (
        <>
            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Subscription'
                    detail='Semua list user yang melakukan subscription'
                />

                <MainTable data={data} columns={columns} />
            </SectionWrapper>
        </>
    );
}
