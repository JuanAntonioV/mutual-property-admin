import { MoonLoader } from 'react-spinners';

export default function AuthLoading({ children, isLoading }) {
    if (isLoading) {
        return (
            <div className='flex-col w-screen h-screen gap-4 bg-white flexCenter'>
                <MoonLoader color='#213D77' size={40} />
                <p className='text-secondary'>Mohon tunggu...</p>
            </div>
        );
    }

    return children;
}
