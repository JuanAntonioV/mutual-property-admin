import { MdLocationOn, MdMyLocation } from 'react-icons/md';
import SectionHeader from '../../../components/headers/SectionHeader';
import SectionWrapper from '../../../components/wrappers/SectionWrapper';
import { HiDocumentText } from 'react-icons/hi';

export default function CreateProjectPage() {
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

                    <div>
                        <p className='pb-3 mt-10 mb-4 font-semibold border-b'>
                            Detail Informasi
                        </p>
                    </div>

                    <div></div>
                </main>
            </SectionWrapper>
        </form>
    );
}
