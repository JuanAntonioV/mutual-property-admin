import { useQuery } from '@tanstack/react-query';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { useMemo } from 'react';
import { getAllSubscriptionApi } from '../../api/subscription-api';
import { dateFormater } from '../../utils/formaters';

export default function SubscriptionPage() {
    const { data: subscriptions, isLoading: isSubscriptionsLoading } = useQuery(
        ['subscriptions'],
        () => getAllSubscriptionApi(),
        {
            select: (data) => data.results,
        }
    );

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Nomor whatsApp',
                accessor: 'phone',
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
        return subscriptions
            ? subscriptions?.map((item) => {
                  return {
                      count: count++,
                      phone: item.phone,
                      postedAt: dateFormater(item.subscribed_at),
                  };
              })
            : [];
    }, [subscriptions]);

    return (
        <>
            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Subscription'
                    detail='Semua list user yang melakukan subscription'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    isLoading={isSubscriptionsLoading}
                />
            </SectionWrapper>
        </>
    );
}
