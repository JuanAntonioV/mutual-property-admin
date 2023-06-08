import { PulseLoader } from 'react-spinners';

export default function DataLoader({
    children,
    isLoading,
    error = null,
    data = [],
    loadElement = <PulseLoader color='blue' size={20} />,
    notFoundElement = <p className='text-medium'>Tidak Ada Data</p>,
}) {
    return (
        <>
            {!isLoading && !error && data && data.length > 0 ? (
                <>{children}</>
            ) : !error && isLoading ? (
                <>{loadElement}</>
            ) : (
                <>{notFoundElement}</>
            )}
        </>
    );
}
