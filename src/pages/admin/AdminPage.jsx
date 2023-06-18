import { useMemo } from 'react';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { TiWarningOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { dateFormater } from '../../utils/formaters';
import { useQuery } from '@tanstack/react-query';
import { getAllAdmins } from '../../api/admin-api';

export default function AdminPage() {
    const navigate = useNavigate();
    // const [selectedAdminId, setSelectedAdminId] = useState('');

    const { data: admins, isLoading: adminsLoading } = useQuery(
        ['admins'],
        () => getAllAdmins(),
        {
            select: (data) => data.results,
        }
    );

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Nama Lengkap',
                accessor: 'fullName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Tanggal Masuk',
                accessor: 'joinedAt',
            },
            {
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const handleNonactiveAdmin = (id) => {
        console.log('nonactive admin');
        // setSelectedAdminId(id);
        window.nonactiveConfirmation.showModal();
    };

    const handleViewDetail = (id) => {
        // setSelectedAdminId(id);
        navigate(`/admins/${id}`);
    };

    const data = useMemo(() => {
        let count = 1;
        return admins
            ? admins.map((admin) => {
                  return {
                      count: count++,
                      fullName: admin.detail.full_name,
                      email: admin.email,
                      status: (
                          <span
                              className={`px-4 py-3 text-white badge ${
                                  admin.status ? 'bg-success' : 'bg-error'
                              }`}
                          >
                              {admin.status ? 'Aktif' : 'Nonaktif'}
                          </span>
                      ),
                      joinedAt: dateFormater(
                          admin.detail.recruitment_date || Date.now(),
                          true
                      ),
                      action: (
                          <div className='flex flex-row gap-2'>
                              <button
                                  className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit'
                                  onClick={() => handleViewDetail(admin.id)}
                              >
                                  <AiOutlineFileSearch size={20} />
                              </button>

                              <button
                                  className='text-white btn btn-outline btn-sm bg-bgNegative hover:bg-bgNegative border-bgNegative hover:border-inherit'
                                  onClick={() => handleNonactiveAdmin(admin.id)}
                              >
                                  <TiWarningOutline size={20} />
                              </button>
                          </div>
                      ),
                  };
              })
            : [];
    }, [admins]);

    const handleNewAdmin = () => {
        navigate('/admins/create');
    };

    return (
        <>
            <dialog id='nonactiveConfirmation' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <button
                            htmlFor='nonactiveConfirmation'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                        <h3 className='text-lg font-bold'>Nonaktifkan Admin</h3>
                    </header>
                    <main className='py-4'>
                        <p>Apakah anda yakin ingin menonaktifkan admin ini?</p>
                    </main>
                    <footer>
                        <div className='modal-action'>
                            <button className='btn'>Batal</button>
                            <button className='text-white btn btn-error bg-bgNegative'>
                                Nonaktifkan
                            </button>
                        </div>
                    </footer>
                </form>
            </dialog>

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Admin'
                    detail='Semua list admin yang terdaftar pada sistem'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    addAction={handleNewAdmin}
                    isLoading={adminsLoading}
                />
            </SectionWrapper>
        </>
    );
}
