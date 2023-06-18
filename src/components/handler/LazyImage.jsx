import { Suspense } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProfilePlaceholder from '@/assets/img/profile.jpg';
import { MoonLoader } from 'react-spinners';

const LazyImage = ({ src }) => {
    const handleImageError = (event) => {
        event.target.src = ProfilePlaceholder; // Replace with your fallback image URL or any placeholder image
    };

    return (
        <Suspense fallback={<MoonLoader size={30} color='#213D77' />}>
            <LazyLoadImage
                src={src}
                onError={handleImageError}
                alt='Fallback'
                effect='blur'
                className='!object-cover !w-44 !h-44 !object-center !rounded-full'
            />
        </Suspense>
    );
};

export default LazyImage;
