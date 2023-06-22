import { useQuery } from '@tanstack/react-query';
import AdminChangePasswordSection from './partials/AdminChangePasswordSection';
import AdminProfileSection from './partials/AdminProfileSection';
import { getAdminDetailApi } from '../../api/admin-api';
import { useParams } from 'react-router-dom';
import ScreenLoading from '../../components/handler/ScreenLoading';

export default function AdminDetailPage() {
    const { id } = useParams();

    const { isLoading, data } = useQuery(
        ['adminDetail'],
        () => getAdminDetailApi(id),
        {
            select: (res) => res.results,
        }
    );

    if (isLoading) return <ScreenLoading />;

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
