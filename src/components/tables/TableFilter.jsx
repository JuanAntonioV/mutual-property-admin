export default function TableFilter({ filter, setFilter }) {
    return (
        <div className='form-control'>
            <input
                type='text'
                placeholder='Search…'
                className='input input-bordered'
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    );
}
