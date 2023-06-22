import { PulseLoader } from 'react-spinners';

export default function ScreenLoading() {
    return (
        <div className='flex-col h-[calc(100vh-96px)] gap-6 flexCenter'>
            <PulseLoader size={18} color='#213D77' />
            <p className='text-secondary'>Memuat ...</p>
        </div>
    );
}
