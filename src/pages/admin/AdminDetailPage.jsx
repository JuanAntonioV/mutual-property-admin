import AdminChangePasswordSection from './partials/AdminChangePasswordSection';
import AdminProfileSection from './partials/AdminProfileSection';

export default function AdminDetailPage() {
    return (
        <>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                <div className='w-full col-span-2'>
                    <AdminProfileSection />
                </div>

                <div className='w-full'>
                    <AdminChangePasswordSection />
                </div>
            </div>
        </>
    );
}
