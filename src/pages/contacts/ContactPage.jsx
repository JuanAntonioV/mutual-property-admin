import { useMemo, useState } from 'react';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getAllContacts } from '../../api/contact-api';
import { dateFormater, textDotsFormat } from '../../utils/formaters';

export default function ContactPage() {
    const [selectedData, setSelectedData] = useState(null);

    const { data: contacts, isLoading: contactLoading } = useQuery(
        ['contacts'],
        () => getAllContacts(),
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
                Header: 'Nomor WhatsApp',
                accessor: 'phone',
            },
            {
                Header: 'Pesan',
                accessor: 'message',
            },
            {
                Header: 'Tanggal Subscription',
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
        return contacts
            ? contacts?.map((contact) => {
                  return {
                      count: count++,
                      fullName: contact.full_name,
                      phone: contact.phone,
                      message: textDotsFormat(contact.message, 50),
                      postedAt: dateFormater(contact.posted_at),
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
    }, [contacts]);

    const handleViewDetail = (id) => {
        const selectedContact = contacts.find((contact) => contact.id === id);
        setSelectedData(selectedContact);
        window.contactDetailModal.showModal();
    };

    return (
        <>
            <dialog id='contactDetailModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <h3 className='text-lg font-bold'>Detail Pesan</h3>
                        <button
                            htmlFor='contactDetailModal'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                    </header>
                    <main className='py-4'>
                        <p>
                            {selectedData?.full_name}{' '}
                            <span className='font-bold'>
                                ({selectedData?.phone})
                            </span>
                        </p>

                        <p className='mt-4'>{selectedData?.message}</p>
                    </main>
                    <footer className='modal-action'>
                        <button className='btn'>Close</button>
                    </footer>
                </form>
            </dialog>

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Contact'
                    detail='Semua list user yang mengirimkan pesan lewat contact form'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    isLoading={contactLoading}
                />
            </SectionWrapper>
        </>
    );
}
