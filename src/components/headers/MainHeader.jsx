import DefaultProfileImage from '@/assets/img/profile.jpg';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { textCapitalize } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '@/api/auth-api';
import { PulseLoader } from 'react-spinners';

export default function MainHeader() {
    const navigate = useNavigate();

    const { user, token, setToken, setUser } = useAuth();

    const queryClient = useQueryClient();
    const { mutate: logoutAction, isLoading } = useMutation(
        (token) => logoutApi(token),
        {
            onSuccess: (res) => {
                if (res.code === 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('account');
                    setUser(null);
                    setToken('');
                    navigate('/login', { replace: true });
                    queryClient.resetQueries('user');
                }
            },
        }
    );

    const handleLogout = () => logoutAction(token);

    return (
        <header className='w-full h-24 px-10 bg-white border-b border-borderPrimary xl:col-span-6 lg:col-span-4 flexBetween'>
            <div className='ml-auto'>
                <div className='cursor-pointer dropdown dropdown-end'>
                    <div tabIndex={0} className='flex items-center gap-4'>
                        <div className='avatar'>
                            <div className='rounded-full w-11 ring ring-link ring-offset-base-100 ring-offset-1'>
                                <img src={DefaultProfileImage} alt='Profile' />
                            </div>
                        </div>
                        <div>
                            <p className='text-base font-bold'>
                                {user && user.detail.full_name}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {user && textCapitalize(user.detail.position)}
                            </p>
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className='p-2 mt-6 border shadow-lg dropdown-content menu bg-base-100 rounded-box w-52'
                    >
                        <li>
                            <Link to={'/profile'} className='py-2'>
                                Profile
                            </Link>
                        </li>
                        <li className='pt-2 mt-2 border-t'>
                            <button
                                disabled={isLoading}
                                className='py-2'
                                onClick={handleLogout}
                            >
                                {isLoading ? (
                                    <PulseLoader size={8} color={'#213D77'} />
                                ) : (
                                    'Logout'
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
