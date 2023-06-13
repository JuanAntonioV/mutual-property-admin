import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table';

import TableNoData from './TableNoData';
import TableFilter from './TableFilter';

import { MdAdd } from 'react-icons/md';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function MainTable({ columns, data, addAction, noFilter }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        pageCount,
        setPageSize,
        canPreviousPage,
        canNextPage,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { pageIndex, pageSize, globalFilter } = state;

    return (
        <div className='px-4 py-2 overflow-x-auto'>
            <div className='gap-2 mb-4 flexBetween'>
                {!noFilter && (
                    <TableFilter
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                    />
                )}

                {addAction && (
                    <button
                        onClick={addAction}
                        className='text-white btn bg-success hover:bg-success/70'
                    >
                        <MdAdd size={16} />
                        <span>Create</span>
                    </button>
                )}
            </div>

            <table
                className='table table-zebra table-pin-rows table-lg'
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                            {headerGroup.headers.map((column, i) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    key={i}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.length > 0 ? (
                        page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={i}>
                                    {row.cells.map((cell, i) => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                key={i}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr className='relative'>
                            <TableNoData />
                        </tr>
                    )}
                </tbody>
            </table>

            <div className='pt-10 flexBetween'>
                <div className='gap-4 flexCenter'>
                    <div>
                        <select
                            className='w-full max-w-xs select select-bordered select-sm'
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className='text-sm'>entries</span>
                </div>
                <div className='gap-4 flexCenter'>
                    <div className='flexCenter'>
                        <span className='text-sm'>Page</span>
                        <span className='mx-2 text-sm'>
                            <strong>
                                {pageIndex + 1} of {pageCount}
                            </strong>
                        </span>
                        <span>|</span>
                    </div>
                    <div className='btn-group'>
                        <button
                            onClick={previousPage}
                            disabled={!canPreviousPage}
                            className='btn btn-outline text-primary btn-sm border-borderPrimary hover:text-white hover:bg-primary'
                        >
                            <HiChevronLeft size={20} />
                        </button>

                        <button
                            onClick={nextPage}
                            disabled={!canNextPage}
                            className='btn btn-outline btn-sm text-primary border-borderPrimary hover:text-white hover:bg-primary'
                        >
                            <HiChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
