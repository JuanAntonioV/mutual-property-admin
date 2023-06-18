import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import MainSidebar from '@/components/sidebar/MainSidebar';
import MainHeader from '@/components/headers/MainHeader';
import MainContainer from '@/components/containers/MainContainer';
import AuthLoading from '../components/handler/AuthLoading';
import { useEffect } from 'react';

export default function MainLayout() {
    const { isAuthLoading, user } = useAuth();

    useEffect(() => {
        console.log('user', user);
    }, [user]);

    return (
        <AuthLoading isLoading={isAuthLoading}>
            <section className='grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7'>
                <MainSidebar />
                <MainHeader />

                <main className='w-full h-[calc(100vh-96px)] xl:col-span-6 lg:col-span-4 bg-gray-100 overflow-auto '>
                    <MainContainer>
                        <Outlet />
                    </MainContainer>
                </main>
            </section>
        </AuthLoading>
    );
}
