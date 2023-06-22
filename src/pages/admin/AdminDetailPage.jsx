import { useQuery } from '@tanstack/react-query';
import AdminChangePasswordSection from './partials/AdminChangePasswordSection';
import AdminProfileSection from './partials/AdminProfileSection';
import { getAdminDetailApi } from '../../api/admin-api';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

export default function AdminDetailPage() {
    const { id } = useParams();

    const { isLoading, data } = useQuery(
        ['adminDetail'],
        () => getAdminDetailApi(id),
        {
            select: (res) => res.results,
        }
    );

    if (isLoading)
        return (
            <div className='flex-col h-full gap-6 flexCenter'>
                <PulseLoader size={18} color='#213D77' />
                <p className='text-secondary'>Memuat ...</p>
            </div>
        );

    return (
        <>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                <div className='w-full col-span-2'>
                    <AdminProfileSection data={data} />
                </div>

                <div className='w-full'>
                    <AdminChangePasswordSection />
                </div>
            </div>
        </>
    );
}
