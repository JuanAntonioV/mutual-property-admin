import { MdLocationOn, MdMyLocation } from 'react-icons/md';
import SectionHeader from '../../../components/headers/SectionHeader';
import SectionWrapper from '../../../components/wrappers/SectionWrapper';
import { HiDocumentText } from 'react-icons/hi';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function CreateProjectPage() {
    const [editorData, setEditorData] = useState('');

    return (
        <form>
            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Create Project'
                    detail='Menu ini digunakan untuk membuat project baru.'
                />

                <main className='space-y-4'>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Nama Developer{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <input
                            name='developerName'
                            type='text'
                            className='input input-bordered'
                            placeholder='Masukkan nama developer'
                            required
                        />
                    </div>

                    <div className='flex flex-wrap items-center w-full space-y-4 gap-x-8 md:flex-nowrap md:space-y-0'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Alamat Lengkap Proyek{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <span className='input-group-addon text-primary'>
                                    <MdLocationOn size={23} />
                                </span>
                                <input
                                    name='location'
                                    type='text'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan alamat lengkap proyek'
                                    required
                                />
                            </div>
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Pastikan lokasi proyek sudah benar
                                </span>
                            </label>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Link Lokasi Proyek{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <span className='input-group-addon text-primary'>
                                    <MdMyLocation size={23} />
                                </span>
                                <input
                                    name='location_link'
                                    type='text'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan link google maps lokasi proyek'
                                    required
                                />
                            </div>
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Silahkan copy link google maps lokasi
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Luas Area Proyek{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <div className='input-group'>
                            <input
                                name='area'
                                type='number'
                                className='w-full input input-bordered'
                                placeholder='Masukkan luas area proyek'
                                required
                            />
                            <span className='font-semibold input-group-addon text-primary'>
                                m<sup>2</sup>
                            </span>
                        </div>
                        <label className='label'>
                            <span className='label-text-alt'>
                                Silahkan masukkan luas area proyek dalam satuan
                                m<sup>2</sup>
                            </span>
                        </label>
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Jenis Kepemilikan Properti{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <div className='input-group'>
                            <span className='input-group-addon text-primary'>
                                <HiDocumentText size={23} />
                            </span>
                            <input
                                name='ownership'
                                type='text'
                                className='w-full input input-bordered'
                                placeholder='Masukkan jenis kepemilikan'
                                required
                                maxLength={5}
                            />
                        </div>
                        <label className='label'>
                            <span className='label-text-alt'>
                                Contoh: SHM, SHGB, AJB, dll
                            </span>
                        </label>
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Fasiitas Proyek</span>
                        </label>
                        <input
                            name='ownership'
                            type='text'
                            className='w-full input input-bordered'
                            placeholder='Masukkan fasilitas proyek'
                            required
                        />
                        <label className='label'>
                            <span className='label-text-alt'>
                                Contoh: Kolam renang, taman, dll
                            </span>
                        </label>
                    </div>
                    <div className='flex flex-wrap items-center w-full space-y-4 gap-x-8 md:flex-nowrap md:space-y-0'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Upload Harga Proyek
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <input
                                type='file'
                                className='w-full file-input file-input-bordered'
                                accept='image/jpeg, image/png, image/jpg'
                            />
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Format: JPG, PNG, JPEG. Maksimal 5MB
                                </span>
                            </label>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Upload Siteplan Proyek
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <input
                                type='file'
                                className='w-full file-input file-input-bordered'
                                accept='image/jpeg, image/png, image/jpg'
                            />
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Format: JPG, PNG, JPEG. Maksimal 5MB
                                </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <p className='pb-3 mt-10 mb-4 font-semibold border-b'>
                            Kontak Developer
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center w-full space-y-4 gap-x-8 md:flex-nowrap md:space-y-0'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Nomor Telepon
                                </span>
                            </label>
                            <div className='input-group'>
                                <span>
                                    <BsTelephoneFill
                                        size={23}
                                        color='#213D77'
                                    />
                                </span>
                                <input
                                    name='phoneNumber'
                                    type='text'
                                    placeholder='Masukkan nomor telepon developer'
                                    className='w-full input input-bordered'
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Nomor Whatsapp
                                </span>
                            </label>
                            <div className='input-group'>
                                <span>
                                    <IoLogoWhatsapp size={23} color='#213D77' />
                                </span>
                                <input
                                    name='phoneNumber'
                                    type='text'
                                    placeholder='Masukkan nomor whatsapp developer'
                                    className='w-full input input-bordered'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Upload E-Brosur Proyek
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <input
                            type='file'
                            className='w-full file-input file-input-bordered'
                            accept='application/pdf'
                        />
                        <label className='label'>
                            <span className='label-text-alt'>
                                Format: PDF. Maksimal 5MB
                            </span>
                        </label>
                    </div>

                    <div>
                        <p className='pb-3 mt-10 mb-4 font-semibold border-b'>
                            Informasi Tambahan
                        </p>
                    </div>

                    <div className='pt-4'>
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorData}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorData(data);
                            }}
                        />
                    </div>
                </main>

                <footer className='mt-16'>
                    <div className='flex justify-end gap-4'>
                        <button
                            type='button'
                            className='text-white btn btn-error'
                        >
                            Batalkan
                        </button>
                        <button
                            type='submit'
                            className='text-white btn btn-success'
                        >
                            Buat Project
                        </button>
                    </div>
                </footer>
            </SectionWrapper>
        </form>
    );
}
