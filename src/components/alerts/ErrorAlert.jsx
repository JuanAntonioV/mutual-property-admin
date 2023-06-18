import { textCapitalize } from '../../utils/helpers';

export default function ErrorAlert({ isError, error, errorMessage }) {
    if (!isError) return null;

    return (
        <div className='p-4 mb-6 font-medium text-red-600 bg-red-200 border rounded-md border-error'>
            {error
                ? textCapitalize(error.message)
                : textCapitalize(errorMessage)}
        </div>
    );
}
