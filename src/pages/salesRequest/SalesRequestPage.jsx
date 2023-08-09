import { useMemo, useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { dateFormater, textDotsFormat } from '../../utils/formaters';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import { getAllSellProperty } from '../../api/contact-api';
import { getAllSubCategoriesApi } from '../../api/category-api';

export default function SalesRequestPage() {
    const [selectedData, setSelectedData] = useState(null);

    const { data: subCategory, isLoading: isSubCategoryLoading } = useQuery(
        ['subCategory'],
        () => getAllSubCategoriesApi(),
        {
            select: (data) => data.results,
        }
    );

    const { data: sellPropertyData, isLoading: isSellRequestLoading } =
        useQuery(['sellProperty'], () => getAllSellProperty(), {
            select: (data) => data.results,
        });

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
                Header: 'Nomor WhatsApp',
                accessor: 'phone',
            },
            {
                Header: 'Tipe Properti',
                accessor: 'subCategory',
            },
            {
                Header: 'Alamat',
                accessor: 'address',
            },
            {
                Header: 'Tanggal Pengajuan',
                accessor: 'postedAt',
            },
            {
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const data = useMemo(() => {
        let count = 1;
        return sellPropertyData
            ? sellPropertyData?.map((contact) => {
                  return {
                      count: count++,
                      fullName: textDotsFormat(contact.full_name, 50),
                      phone: contact.phone_number,
                      subCategory: (
                          <span className='px-4 py-1 text-sm text-white bg-blue-300 rounded-full'>
                              {
                                  subCategory?.find(
                                      (subCat) =>
                                          subCat.id ===
                                          contact.sub_categories_id
                                  )?.name
                              }
                          </span>
                      ),
                      address: textDotsFormat(contact.address, 50),
                      message: textDotsFormat(contact.description, 50),
                      postedAt: dateFormater(contact.created_at),
                      action: (
                          <div className='flex flex-row gap-2'>
                              <button
                                  className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit '
                                  onClick={() => handleViewDetail(contact.id)}
                              >
                                  <AiOutlineFileSearch size={20} />
                              </button>
                          </div>
                      ),
                  };
              })
            : [];
    }, [sellPropertyData]);

    const handleViewDetail = (id) => {
        const selectedContact = sellPropertyData.find(
            (contact) => contact.id === id
        );
        setSelectedData(selectedContact);
        window.contactDetailModal.showModal();
    };

    return (
        <>
            <dialog id='contactDetailModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <h3 className='text-lg font-bold'>Detail Pengajuan</h3>
                        <button
                            htmlFor='contactDetailModal'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                    </header>
                    <main className='py-4 space-y-4'>
                        <div className='flex flex-row gap-2 mt-2'>
                            <span>Nama: </span>
                            <span className='font-bold'>
                                {selectedData?.full_name}
                            </span>
                        </div>
                        <div className='flex flex-row gap-2 mt-2'>
                            <span>Tipe Properti: </span>
                            <span className='px-4 py-1 text-sm text-white bg-blue-300 rounded-full'>
                                {
                                    subCategory?.find(
                                        (subCat) =>
                                            subCat.id ===
                                            selectedData?.sub_categories_id
                                    )?.name
                                }
                            </span>
                        </div>
                        <div className='flex flex-row gap-2 mt-2'>
                            <span>Nomor WhatsApp: </span>
                            <span className='font-bold'>
                                {selectedData?.phone_number}
                            </span>
                        </div>
                        <div className='flex flex-row gap-2 pb-4 mt-2'>
                            <span>Alamat: </span>
                            <span className='font-bold'>
                                {selectedData?.address}
                            </span>
                        </div>

                        <div className='pt-6 pb-6 border-t'>
                            <p className='font-bold '>Pesan:</p>
                            <p className='mt-4'>{selectedData?.description}</p>
                        </div>
                    </main>
                    <footer className='modal-action'>
                        <button className='btn'>Close</button>
                    </footer>
                </form>
            </dialog>

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Sales Request'
                    detail='Semua list user yang mengirimkan pesan lewat titip jual properti form'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    isLoading={isSellRequestLoading || isSubCategoryLoading}
                />
            </SectionWrapper>
        </>
    );
}
