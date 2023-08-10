import { useMemo, useState } from 'react';
import SectionHeader from '../../components/headers/SectionHeader';
import MainTable from '../../components/tables/MainTable';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { textDotsFormat } from '../../utils/formaters';
import {
    addNewGalleryApi,
    deleteGalleryApi,
    getAllGalleryApi,
    // updateGalleryApi,
} from '../../api/gallery-api';
import { BiTrash } from 'react-icons/bi';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function GalleryPage() {
    const [selectedData, setSelectedData] = useState(null);
    const [selectedGalleryId, setSelectedGalleryId] = useState(null);
    // const [sequence, setSequence] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [form, setForm] = useState({
        sequence: 1,
        path: null,
    });

    const handleOnChangeForm = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            const uploaded = files[0];
            setPreviewImage(URL.createObjectURL(uploaded));

            setForm((prev) => ({
                ...prev,
                path: uploaded,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const { mutate: createGallery, isLoading: isCreateGalleryLoading } =
        useMutation((payload) => addNewGalleryApi(payload), {
            onSuccess: () => {
                queryClient.invalidateQueries('gallery');
                toast.success('Berhasil menambahkan gambar');
                window.createGalleryModal.close();
                setPreviewImage(null);
                setForm({
                    sequence: 1,
                    path: null,
                });
            },
        });

    const handleOnSubmitForm = (e) => {
        e.preventDefault();

        if (!form.path) {
            toast.error('Silahkan pilih gambar terlebih dahulu');
            return;
        } else {
            const payload = {
                sequence: form.sequence,
                image: form.path,
            };

            createGallery(payload);
        }
    };

    // const handleOnChangeSequence = (e) => {
    //     setSequence(e.target.value);
    // };

    const { data: gallery, isLoading: isGalleryLoading } = useQuery(
        ['gallery'],
        () => getAllGalleryApi(),
        {
            select: (data) => data.results,
        }
    );

    // useEffect(() => {
    //     if (selectedData) {
    //         setSequence(selectedData.sequence);

    //         return () => {
    //             setSequence(null);
    //         };
    //     }
    // }, [selectedData]);

    const queryClient = useQueryClient();

    const { mutate: deleteGallery, isLoading: isDeleteGalleryLoading } =
        useMutation((payload) => deleteGalleryApi(payload), {
            onSuccess: () => {
                queryClient.invalidateQueries('gallery');
                toast.success('Berhasil menghapus gambar');
                window.deleteGalleryModal.close();
            },
        });

    // const { mutate: updateGallery, isLoading: isUpdateGalleryLoading } =
    //     useMutation((payload) => updateGalleryApi(payload), {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries('gallery');
    //             toast.success('Berhasil mengubah gambar');
    //             window.galleryDetailModal.close();
    //         },
    //     });

    // const handleUpdateGallery = () => {
    //     const payload = {
    //         sequence: sequence,
    //     };

    //     updateGallery({ id: selectedData?.id, payload });
    // };

    const handleDeleteGalleryClicked = (id) => {
        setSelectedGalleryId(id);
        window.deleteGalleryModal.showModal();
    };

    const handleDeleteGalleryModal = () => {
        deleteGallery(selectedGalleryId);
    };

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Gambar',
                accessor: 'image',
            },
            {
                Header: 'Alt Gambar',
                accessor: 'alt',
            },
            // {
            //     Header: 'Urutan',
            //     accessor: 'sequence',
            // },
            {
                Header: 'Action',
                accessor: 'action',
            },
        ],
        []
    );

    const data = useMemo(() => {
        let count = 1;
        return gallery
            ? gallery?.map((gal) => {
                  return {
                      count: count++,
                      image: (
                          <img
                              src={gal.path}
                              alt={gal.alt}
                              className='object-cover w-32 h-20 rounded-md'
                          />
                      ),
                      alt: textDotsFormat(gal.alt, 40),
                      sequence: gal.sequence,
                      action: (
                          <div className='flex flex-row gap-2'>
                              <button
                                  className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit '
                                  onClick={() => handleViewDetail(gal.id)}
                              >
                                  <AiOutlineFileSearch size={20} />
                              </button>
                              <button
                                  className='bg-red-500 hover:bg-red-600 btn btn-sm hover:text-inherit'
                                  onClick={() =>
                                      handleDeleteGalleryClicked(gal.id)
                                  }
                                  disabled={isDeleteGalleryLoading}
                              >
                                  {isDeleteGalleryLoading ? (
                                      <PulseLoader size={10} color='#fff' />
                                  ) : (
                                      <BiTrash size={20} color='#fff' />
                                  )}
                              </button>
                          </div>
                      ),
                  };
              })
            : [];
    }, [gallery]);

    const handleViewDetail = (id) => {
        const selectedContact = gallery.find((contact) => contact.id === id);
        setSelectedData(selectedContact);
        window.galleryDetailModal.showModal();
    };

    const handleOpenCreateModal = () => {
        window.createGalleryModal.showModal();
    };

    return (
        <>
            <dialog id='createGalleryModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <h3 className='text-lg font-bold'>Tambah Gambar</h3>
                        <button
                            htmlFor='createGalleryModal'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                    </header>
                    <main className='py-4 mt-4'>
                        {previewImage && (
                            <div className='w-full h-[400px] rounded-lg overflow-hidden'>
                                <img
                                    src={previewImage}
                                    alt={'Preview image'}
                                    className='object-cover w-full h-full'
                                />
                            </div>
                        )}
                        <div className='mt-4 space-y-3'>
                            <p className='text-base font-bold'>Gambar</p>
                            <input
                                name='image'
                                type='file'
                                onChange={handleOnChangeForm}
                                className='inputSecondary'
                                accept='image/*'
                            />
                        </div>
                        {/* <div className='mt-4 space-y-3'>
                            <p className='text-base font-bold'>Urutan</p>
                            <input
                                name='sequence'
                                type='number'
                                value={form.sequence}
                                onChange={handleOnChangeSequence}
                                className='inputSecondary'
                            />
                        </div> */}
                    </main>
                    <footer className='modal-action'>
                        <button className='btn'>Close</button>
                        <button
                            type='button'
                            className='text-white btn btn-info'
                            onClick={handleOnSubmitForm}
                            disabled={isCreateGalleryLoading}
                        >
                            {isCreateGalleryLoading ? (
                                <PulseLoader size={10} color='#fff' />
                            ) : (
                                'Simpan'
                            )}
                        </button>
                    </footer>
                </form>
            </dialog>

            <dialog id='galleryDetailModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <h3 className='text-lg font-bold'>Detail Pesan</h3>
                        <button
                            htmlFor='galleryDetailModal'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                    </header>
                    <main className='py-4 mt-4'>
                        <div className='w-full h-[400px] rounded-lg overflow-hidden'>
                            <img
                                src={selectedData?.path}
                                alt={selectedData?.alt}
                                className='object-cover w-full h-full'
                            />
                        </div>

                        <div className='mt-4'>
                            <p className='text-base font-bold'>Alt Gambar</p>
                            <p className='text-base'>{selectedData?.alt}</p>
                        </div>

                        {/* <div className='mt-4 space-y-3'>
                            <p className='text-base font-bold'>Urutan</p>
                            <input
                                type='number'
                                value={sequence}
                                onChange={handleOnChangeSequence}
                                className='inputSecondary'
                            />
                        </div> */}
                    </main>
                    <footer className='modal-action'>
                        <button
                            type='button'
                            className='bg-red-500 hover:bg-red-600 btn hover:text-inherit'
                            onClick={() =>
                                handleDeleteGalleryClicked(selectedData?.id)
                            }
                            disabled={isDeleteGalleryLoading}
                        >
                            {isDeleteGalleryLoading ? (
                                <PulseLoader size={10} color='#fff' />
                            ) : (
                                <BiTrash size={20} color='#fff' />
                            )}
                        </button>

                        <div className='flex-1'></div>

                        <button className='btn'>Close</button>
                        {/* <button
                            type='button'
                            className='text-white btn btn-info'
                            onClick={handleUpdateGallery}
                            disabled={isUpdateGalleryLoading}
                        >
                            {isUpdateGalleryLoading ? (
                                <PulseLoader size={10} color='#fff' />
                            ) : (
                                'Simpan'
                            )}
                        </button> */}
                    </footer>
                </form>
            </dialog>

            <dialog id='deleteGalleryModal' className='modal'>
                <form method='dialog' className='modal-box'>
                    <header>
                        <button
                            htmlFor='my-modal-3'
                            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
                        >
                            ✕
                        </button>
                        <h3 className='text-lg font-bold'>Hapus Gambar</h3>
                    </header>
                    <main className='mt-5'>
                        <p className='text-base'>
                            Apakah anda yakin ingin menghapus gambar ini?
                        </p>
                    </main>
                    <footer className='pt-4 modal-action'>
                        <button className='btn'>Batalkan</button>
                        <button
                            type='button'
                            className='text-white btn btn-error'
                            onClick={handleDeleteGalleryModal}
                            disabled={isDeleteGalleryLoading}
                        >
                            {isDeleteGalleryLoading ? (
                                <PulseLoader size={10} color='#fff' />
                            ) : (
                                'Hapus'
                            )}
                        </button>
                    </footer>
                </form>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Gallery'
                    detail='Semua list gambar yang akan ditampilkan pada halaman utama website.'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    addAction={handleOpenCreateModal}
                    isLoading={isGalleryLoading}
                />
            </SectionWrapper>
        </>
    );
}
