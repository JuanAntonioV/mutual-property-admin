import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SectionHeader from '@/components/headers/SectionHeader';
import { formatRupiah } from '@/utils/helpers';

import { MdLocationOn, MdMyLocation } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';
import { TbStairs } from 'react-icons/tb';
import { HiDocumentText } from 'react-icons/hi';
import { RiCarWashingFill } from 'react-icons/ri';

export default function CreatePropertyPage() {
    const { category } = useParams();
    const navigate = useNavigate();

    const categoryList = ['baru', 'dijual', 'disewa'];

    useEffect(() => {
        if (!categoryList.includes(category)) navigate('/property');
    }, [category, categoryList]);

    const [form, setForm] = useState({
        title: '',
        price: '',
        category: '',
        type: '',
        address: '',
        location_link: '',
        beds: 0,
        baths: 0,
        floors: 0,
        ownership: '',
        carport: 0,
        soil_size_width: '',
        soil_size_height: '',
        building_size_width: '',
        building_size_height: '',
        electricity_meter: 0,
    });

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            category: category,
        }));
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[a-zA-Z0-9.,-]*$/;

        const formated = formatRupiah(value);

        if (value.match(regex)) {
            if (name === 'price') {
                setForm({
                    ...form,
                    [name]: formated,
                });
            } else {
                setForm({
                    ...form,
                    [name]: value,
                });
            }
        }
    };

    return (
        <form>
            <SectionWrapper className={'mt-0 pb-10'}>
                <SectionHeader
                    title='Create Property'
                    detail='Menu ini digunakan untuk membuat property baru'
                />

                <main>
                    <form className='space-y-4'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Judul Properti{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <input
                                name='title'
                                type='text'
                                className='input input-bordered'
                                placeholder='Masukkan judul properti'
                                required
                                value={form.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Kategori Properti{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <select
                                className='w-full select select-bordered'
                                name='type'
                                value={form.category}
                                onChange={handleChange}
                                disabled
                            >
                                <option value=''>Pilih kategori</option>
                                <option value='baru'>Baru</option>
                                <option value='disewa'>Disewa</option>
                                <option value='dijual'>Dijual</option>
                            </select>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Tipe Properti{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <select
                                className='w-full select select-bordered'
                                name='type'
                                value={form.type}
                                onChange={handleChange}
                            >
                                <option value=''>Pilih Tipe Property</option>
                                <option value='rumah'>Rumah</option>
                                <option value='ruko'>Ruko</option>
                                <option value='gudang-pabrik'>Apartemen</option>
                                <option value='komersial'>Komersial</option>
                            </select>
                        </div>
                    </form>
                </main>
            </SectionWrapper>

            <SectionWrapper className={'pb-10'}>
                <SectionHeader
                    title='Harga / Alamat Properti'
                    detail='Menu ini digunakan untuk membuat property baru'
                />
                <main className='space-y-4'>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Harga Properti{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <label className='input-group'>
                            <span className='font-bold text-primary'>Rp</span>
                            <input
                                name='price'
                                type='text'
                                className='w-full input input-bordered'
                                placeholder='Masukkan harga properti'
                                required
                                value={form.price}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className='flex flex-wrap items-center w-full space-y-4 gap-x-8 md:flex-nowrap md:space-y-0'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Alamat Lengkap Properti{' '}
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
                                    placeholder='Masukkan alamat lengkap properti'
                                    required
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Pastikan lokasi properti sudah benar
                                </span>
                            </label>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Link Lokasi Properti{' '}
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
                                    placeholder='Masukkan link google maps lokasi properti'
                                    required
                                    value={form.location_link}
                                    onChange={handleChange}
                                />
                            </div>
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Silahkan copy link google maps lokasi
                                </span>
                            </label>
                        </div>
                    </div>
                </main>
            </SectionWrapper>

            <SectionWrapper className={'pb-10'}>
                <SectionHeader
                    title='Detail Properti'
                    detail='Menu ini digunakan untuk membuat property baru'
                />

                <main className='space-y-4'>
                    <div className='flex flex-wrap items-center w-full space-y-4 lg:flex-nowrap md:space-y-0 gap-x-8'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Jumlah Kamar Tidur{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <span className='input-group-addon text-primary'>
                                    <FaBed size={23} />
                                </span>
                                <input
                                    name='beds'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan jumlah kamar tidur'
                                    required
                                    value={form.beds}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Jumlah Kamar Mandi{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <span className='input-group-addon text-primary'>
                                    <FaBath size={23} />
                                </span>
                                <input
                                    name='baths'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan jumlah kamar mandi'
                                    required
                                    value={form.baths}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Jumlah Tingkat Lantai{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <span className='input-group-addon text-primary'>
                                    <TbStairs size={23} />
                                </span>
                                <input
                                    name='floors'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan jumlah tingkat lantai'
                                    required
                                    value={form.floors}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Jenis Kepemilikan{' '}
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
                                value={form.ownership}
                                onChange={handleChange}
                            />
                        </div>
                        <label className='label'>
                            <span className='label-text-alt'>
                                Contoh: SHM, SHGB, AJB, dll
                            </span>
                        </label>
                    </div>
                    <div className='flex flex-wrap items-center w-full space-y-4 lg:flex-nowrap md:space-y-0 gap-x-8'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Jumlah Garasi Mobil{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <span className='input-group-addon text-primary'>
                                    <RiCarWashingFill size={23} />
                                </span>
                                <input
                                    name='carport'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan jumlah garasi mobil'
                                    required
                                    value={form.carport}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Meteran Listrik{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <input
                                    name='electricity_meter'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan jumlah garasi mobil'
                                    required
                                    value={form.electricity_meter}
                                    onChange={handleChange}
                                />
                                <span className='font-semibold input-group-addon text-primary'>
                                    Watt
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </SectionWrapper>

            <SectionWrapper className={'pb-10'}>
                <SectionHeader
                    title='Ukuran Properti'
                    detail='Menu ini digunakan untuk membuat property baru'
                />

                <main>
                    <div>
                        <p className='mt-10 font-medium'>Ukuran Tanah</p>
                    </div>

                    <div className='flex flex-wrap items-center w-full space-y-4 lg:flex-nowrap md:space-y-0 gap-x-8'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Panjang{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <input
                                    name='soil_size_height'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan ukuran tanah'
                                    required
                                    value={form.soil_size_height}
                                    onChange={handleChange}
                                />
                                <span className='font-semibold input-group-addon text-primary'>
                                    m
                                </span>
                            </div>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Lebar{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <input
                                    name='soil_size_width'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan ukuran tanah'
                                    required
                                    value={form.soil_size_width}
                                    onChange={handleChange}
                                />
                                <span className='font-semibold input-group-addon text-primary'>
                                    m
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className='mt-8 font-medium'>Ukuran Bangunan</p>
                    </div>

                    <div className='flex flex-wrap items-center w-full space-y-4 lg:flex-nowrap md:space-y-0 gap-x-8'>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Panjang{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <input
                                    name='building_size_height'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan ukuran tanah'
                                    required
                                    value={form.building_size_height}
                                    onChange={handleChange}
                                />
                                <span className='font-semibold input-group-addon text-primary'>
                                    m
                                </span>
                            </div>
                        </div>
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Lebar{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <div className='input-group'>
                                <input
                                    name='building_size_width'
                                    type='number'
                                    className='w-full input input-bordered'
                                    placeholder='Masukkan ukuran tanah'
                                    required
                                    value={form.building_size_width}
                                    onChange={handleChange}
                                />
                                <span className='font-semibold input-group-addon text-primary'>
                                    m
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </SectionWrapper>
        </form>
    );
}
