import { Outlet } from 'react-router-dom';

import MainSidebar from '@/components/sidebar/MainSidebar';
import MainHeader from '@/components/headers/MainHeader';
import MainContainer from '@/components/containers/MainContainer';

export default function MainLayout() {
    return (
        <section className='grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7'>
            <MainSidebar />
            <MainHeader />

            <main className='w-full h-[calc(100vh-96px)] xl:col-span-6 lg:col-span-4 bg-white overflow-auto '>
                <MainContainer>
                    <Outlet />
                </MainContainer>
            </main>
        </section>
    );
}
