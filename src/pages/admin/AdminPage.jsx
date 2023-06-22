import { useMemo, useState } from 'react';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { TiWarningOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { dateFormater } from '../../utils/formaters';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllAdmins, nonActiveAdminApi } from '../../api/admin-api';
import useAuth from '../../hooks/useAuth';
import { MoonLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function AdminPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedAdmin, setSelectedAdmin] = useState('');

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

    const queryClient = useQueryClient();

    const { mutate: nonActiveAdminAction, isLoading: isNonActiveAdminLoading } =
        useMutation((payload) => nonActiveAdminApi(payload), {
            onSuccess: (data) => {
                window.nonactiveConfirmation.close();
                queryClient.invalidateQueries('admins');
                toast.success(data?.message);
            },
        });

    const handleNonactiveAdmin = (admin) => {
        setSelectedAdmin(admin);
        window.nonactiveConfirmation.showModal();
    };

    const handleViewDetail = (admin) => {
        setSelectedAdmin(admin);
        navigate(`/admins/${admin?.id}`);
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
                      action:
                          admin.id === user.id ? (
                              <p className='text-sm text-gray-400'>
                                  Tidak ada action
                              </p>
                          ) : (
                              <div className='flex flex-row gap-2'>
                                  <button
                                      className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit'
                                      onClick={() => handleViewDetail(admin)}
                                  >
                                      <AiOutlineFileSearch size={20} />
                                  </button>

                                  <button
                                      className={`text-white btn btn-outline btn-sm hover:border-inherit ${
                                          admin.status
                                              ? 'bg-bgNegative hover:bg-bgNegative border-bgNegative'
                                              : 'bg-success hover:bg-success/80 border-success'
                                      }`}
                                      onClick={() =>
                                          handleNonactiveAdmin(admin)
                                      }
                                      disabled={isNonActiveAdminLoading}
                                  >
                                      {isNonActiveAdminLoading ? (
                                          <MoonLoader
                                              size={22}
                                              color='#213D77'
                                          />
                                      ) : (
                                          <TiWarningOutline size={20} />
                                      )}
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
                        <h3 className='text-lg font-bold'>
                            {selectedAdmin?.status ? 'Nonaktifkan' : 'Aktifkan'}{' '}
                            Admin
                        </h3>
                    </header>
                    <main className='py-4'>
                        <p>
                            Apakah anda yakin ingin{' '}
                            {selectedAdmin?.status
                                ? 'menonaktifkan'
                                : 'mengaktifkan'}{' '}
                            admin ini?
                        </p>
                    </main>
                    <footer>
                        <div className='modal-action'>
                            <button className='btn'>Batal</button>
                            <button
                                className={`text-white btn ${
                                    selectedAdmin?.status
                                        ? 'btn-error'
                                        : 'btn-success'
                                }`}
                                disabled={isNonActiveAdminLoading}
                                onClick={() =>
                                    nonActiveAdminAction(selectedAdmin?.id)
                                }
                            >
                                {isNonActiveAdminLoading ? (
                                    <PulseLoader size={10} color='#fff' />
                                ) : selectedAdmin?.status ? (
                                    'Nonaktifkan'
                                ) : (
                                    'Aktifkan'
                                )}
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
