import { FaUsers } from 'react-icons/fa';

export default function StatSection() {
    return (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-content-center'>
            <div className='w-full p-6 space-y-1 text-white border shadow-xl bg-gradient-to-r from-blue-500 to-cyan-500 stat rounded-2xl border-borderPrimary flexBetween'>
                <div>
                    <h6 className='text-white stat-title'>Total users</h6>
                    <p className='stat-value'>31</p>
                    <p className='text-white stat-desc'>Pada aplikasi ini</p>
                </div>

                <div className='p-3 bg-white border rounded-full flexCenter'>
                    <FaUsers size={35} color='#213D77' />
                </div>
            </div>

            <div className='w-full p-6 text-white border shadow-xl bg-gradient-to-r from-cyan-500 to-teal-500 stat rounded-2xl border-borderPrimary'>
                <h6 className='text-white stat-title'>Total property</h6>
                <p className='stat-value'>120</p>
                <p className='text-white stat-desc'>Pada aplikasi ini</p>
            </div>

            <div className='w-full p-6 text-white border shadow-xl bg-gradient-to-l from-cyan-500 to-teal-500 stat rounded-2xl border-borderPrimary'>
                <h6 className='text-white stat-title'>Total developer</h6>
                <p className='stat-value'>31</p>
                <p className='text-white stat-desc'>Pada aplikasi ini</p>
            </div>

            <div className='w-full p-6 text-white border shadow-xl stat rounded-2xl border-borderPrimary bg-gradient-to-l from-cyan-500 to-sky-500 '>
                <h6 className='text-white stat-title'>Total kontak</h6>
                <p className='stat-value'>0</p>
                <p className='text-white stat-desc'>Pada aplikasi ini</p>
            </div>
        </div>
    );
}
