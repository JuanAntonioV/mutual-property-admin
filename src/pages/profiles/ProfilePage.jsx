import ProfileSection from './partials/ProfileSection';
import ChangePasswordSection from './partials/ChangePasswordSection';

export default function ProfilePage() {
    return (
        <>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                <div className='w-full col-span-2'>
                    <ProfileSection />
                </div>

                <div className='w-full'>
                    <ChangePasswordSection />
                </div>
            </div>
        </>
    );
}
