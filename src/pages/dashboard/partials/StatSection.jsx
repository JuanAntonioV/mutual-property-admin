import { MoonLoader } from 'react-spinners';

import { FaMailBulk, FaUsers } from 'react-icons/fa';
import { BsHousesFill, BsFillBuildingFill } from 'react-icons/bs';
import { getStatApi } from '../../../api/analytic-api';
import { useQuery } from '@tanstack/react-query';

export default function StatSection() {
    const { data: statData, isLoading: statLoading } = useQuery(
        ['stats'],
        () => getStatApi(),
        {
            select: (data) => data.results,
        }
    );

    return (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-content-center'>
            <div className='w-full px-6 py-8 space-y-1 text-white border shadow-xl bg-gradient-to-r from-blue-500 to-cyan-500 stat rounded-2xl border-borderPrimary flexBetween'>
                <div className='space-y-1'>
                    <h6 className='text-white stat-title'>Total users</h6>
                    {statLoading ? (
                        <MoonLoader size={30} color='#fff' className='my-2' />
                    ) : (
                        <p className='stat-value'>{statData.total_user}</p>
                    )}
                    <p className='text-white stat-desc'>Pada aplikasi ini</p>
                </div>

                <div className='p-3 bg-white border rounded-full flexCenter'>
                    <FaUsers size={35} color='#213D77' />
                </div>
            </div>

            <div className='w-full px-6 py-8 text-white border shadow-xl bg-gradient-to-r from-cyan-500 to-teal-500 stat rounded-2xl border-borderPrimary flexBetween'>
                <div className='space-y-1'>
                    <h6 className='text-white stat-title'>Total property</h6>
                    {statLoading ? (
                        <MoonLoader size={30} color='#fff' className='my-2' />
                    ) : (
                        <p className='stat-value'>{statData.total_property}</p>
                    )}
                    <p className='text-white stat-desc'>Pada aplikasi ini</p>
                </div>

                <div className='p-3 bg-white border rounded-full flexCenter'>
                    <BsFillBuildingFill size={35} color='#213D77' />
                </div>
            </div>

            <div className='w-full px-6 py-8 text-white border shadow-xl bg-gradient-to-l from-cyan-500 to-teal-500 stat rounded-2xl border-borderPrimary flexBetween'>
                <div className='space-y-1'>
                    <h6 className='text-white stat-title'>Total developer</h6>
                    {statLoading ? (
                        <MoonLoader size={30} color='#fff' className='my-2' />
                    ) : (
                        <p className='stat-value'>{statData.total_developer}</p>
                    )}
                    <p className='text-white stat-desc'>Pada aplikasi ini</p>
                </div>

                <div className='p-3 bg-white border rounded-full flexCenter'>
                    <BsHousesFill size={34} color='#213D77' />
                </div>
            </div>

            <div className='w-full px-6 py-8 text-white border shadow-xl stat rounded-2xl border-borderPrimary flexBetween bg-gradient-to-l from-cyan-500 to-sky-500 '>
                <div className='space-y-1'>
                    <h6 className='text-white stat-title'>Total kontak</h6>
                    {statLoading ? (
                        <MoonLoader size={30} color='#fff' className='my-2' />
                    ) : (
                        <p className='stat-value'>{statData.total_contact}</p>
                    )}
                    <p className='text-white stat-desc'>Pada aplikasi ini</p>
                </div>

                <div className='p-3 bg-white border rounded-full flexCenter'>
                    <FaMailBulk size={35} color='#213D77' />
                </div>
            </div>
        </div>
    );
}
