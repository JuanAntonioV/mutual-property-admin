export default function TableFilter({ filter, setFilter }) {
    return (
        <div className='form-control'>
            <input
                type='text'
                placeholder='Search…'
                className='py-2 input input-bordered input-md h-fit'
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    );
}
