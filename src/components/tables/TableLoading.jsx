import { PulseLoader } from 'react-spinners';

const TableLoading = (props) => {
    return (
        <td className='absolute -translate-x-1/2 left-1/2' {...props}>
            <PulseLoader size={12} color={'#213D77'} />
        </td>
    );
};

export default TableLoading;
