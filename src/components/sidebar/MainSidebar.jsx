import { Link, useLocation, useNavigate } from 'react-router-dom';

import LogoWhite from '@/assets/brand/logo-white.svg';

import { MdSpaceDashboard, MdOutlineUnsubscribe } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { TbBuildingCommunity } from 'react-icons/tb';
import { BsMailbox } from 'react-icons/bs';

export default function MainSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            name: 'Dashboard',
            icon: <MdSpaceDashboard size={28} color='#fff' />,
            path: '/',
        },
        {
            name: 'Property',
            icon: <TbBuildingCommunity size={28} color='#fff' />,
            path: '/property',
        },
        {
            name: 'Contacts',
            icon: <BsMailbox size={28} color='#fff' />,
            path: '/contacts',
        },
        {
            name: 'Subscriptions',
            icon: <MdOutlineUnsubscribe size={28} color='#fff' />,
            path: '/subscriptions',
        },
        {
            name: 'Admins',
            icon: <RiAdminLine size={28} color='#fff' />,
            path: '/admins',
        },
    ];

    return (
        <div className='hidden w-full h-screen col-span-1 row-span-2 space-y-6 bg-gray-800 lg:block'>
            <header className='w-full py-8'>
                <div className='mx-auto w-44 flexCenter'>
                    <Link to='/' className='block w-full h-full'>
                        <img
                            src={LogoWhite}
                            alt='Logo'
                            className='object-contain w-full h-full'
                        />
                    </Link>
                </div>
            </header>

            <main>
                <nav className='flex flex-col space-y-1'>
                    {menus.map((menu, index) => (
                        <button
                            className={
                                'flex items-center px-8 py-4 space-x-4 text-white transition duration-200 ease-in-out hover:bg-gray-700'
                            }
                            key={index}
                            style={{
                                backgroundColor:
                                    location.pathname === menu.path
                                        ? '#1E86FF'
                                        : '',
                            }}
                            onClick={() => navigate(menu.path)}
                        >
                            {menu.icon}
                            <span className='font-semibold'>{menu.name}</span>
                        </button>
                    ))}
                </nav>
            </main>
        </div>
    );
}
