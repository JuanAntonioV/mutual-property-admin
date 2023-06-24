import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import SectionHeader from '@/components/headers/SectionHeader';
import { formatRupiah } from '@/utils/helpers';

import { MdLocationOn, MdMyLocation } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';
import { TbStairs } from 'react-icons/tb';
import { HiDocumentText } from 'react-icons/hi';
import { RiCarWashingFill } from 'react-icons/ri';
import { useMutation } from '@tanstack/react-query';
import { createPropertyApi } from '../../../api/property-api';
import { PulseLoader } from 'react-spinners';
import useStore from '../../../hooks/useStore';
import { toast } from 'react-toastify';
import { parseRupiah } from '../../../utils/helpers';
import ErrorAlert from '../../../components/alerts/ErrorAlert';

export default function CreatePropertyPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const { categories } = useStore();

    useEffect(() => {
        if (
            !categories &&
            !categories?.find((item) => item.name.toLowerCase() === category)
        ) {
            navigate('/property');
        }
    }, [categories, category, navigate]);

    const [form, setForm] = useState({
        title: '',
        price: '',
        category: '',
        subCategory: '',
        isSold: 0,
        address: '',
        location_link: '',
        beds: 0,
        baths: 0,
        floors: 0,
        project_id: '',
        ownership: '',
        carport: 0,
        building_condition: '',
        soil_size_width: '',
        soil_size_height: '',
        building_size_width: '',
        building_size_height: '',
        electricity_meter: 0,
        building_direction: '',
        floorplan: null,
        images: [],
        facilities: [],
    });

    const [formFacilities, setFormFacilities] = useState('');

    const [formPicture, setFormPicture] = useState([]);
    const fileInputRef = useRef(null);

    const fileInputWrapperRef = useRef(null);

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            category: categories?.find(
                (item) => item.name.toLowerCase() === category
            )?.id,
        }));
    }, [category, categories]);

    const handlePictureChange = (e) => {
        const { files } = e.target;

        const selectedFilesArray = Array.from(files);

        if (selectedFilesArray.length > 10) {
            toast.error('Maksimal 10 gambar');
            return;
        }

        setForm((prev) => ({
            ...prev,
            images: selectedFilesArray,
        }));

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setFormPicture((prev) => prev.concat(imagesArray));

        // FOR BUG IN CHROME
        e.target.value = '';
    };

    const handleDeletePicture = (index) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));

        setFormPicture((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[a-zA-Z0-9.]*$/;

        if (name === 'price' && value.match(regex)) {
            const formated = formatRupiah(value);

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
    };

    const handleFloorplanChange = (e) => {
        const { files } = e.target;

        setForm((prev) => ({
            ...prev,
            floorplan: files[0],
        }));
    };

    const handleAddFacilities = (e) => {
        e.preventDefault();

        if (formFacilities === '') {
            toast.error('Fasilitas tidak boleh kosong');
            return;
        }

        if (form.facilities.includes(formFacilities)) {
            toast.error('Fasilitas sudah ada');
            return;
        }

        setForm((prev) => ({
            ...prev,
            facilities: [...prev.facilities, formFacilities],
        }));

        setFormFacilities('');
    };

    const handleDeleteFacilities = (index) => {
        setForm((prev) => ({
            ...prev,
            facilities: prev.facilities.filter((_, i) => i !== index),
        }));
    };

    const handleFacilitiesChange = (e) => {
        const { value } = e.target;
        setFormFacilities(value);
    };

    const buildingDirectionList = [
        {
            id: 1,
            name: 'Utara',
        },
        {
            id: 2,
            name: 'Selatan',
        },
        {
            id: 3,
            name: 'Timur',
        },
        {
            id: 4,
            name: 'Barat',
        },
        {
            id: 5,
            name: 'Timur Laut',
        },
        {
            id: 6,
            name: 'Tenggara',
        },
        {
            id: 7,
            name: 'Barat Daya',
        },
        {
            id: 8,
            name: 'Barat Laut',
        },
    ];

    const {
        mutate: createProperty,
        isLoading: isCreatePropertyLoading,
        isError: isCreatePropertyError,
        error: createPropertyError,
    } = useMutation(createPropertyApi, {
        onSuccess: () => {
            toast.success('Berhasil membuat properti baru');
            navigate(`/property`);
        },
        onError: () => {
            toast.error('Gagal membuat properti baru');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let type = '';

        switch (form.category) {
            case 1:
            case 2:
                type = 'product';
                break;
            case 3:
                type = 'productProject';
                break;
            default:
                type = null;
                break;
        }

        if (type === null) {
            toast.error('Tipe properti tidak ditemukan');
            return;
        }

        const soilArea = form.soil_size_width * form.soil_size_height;
        const soilSize = `${form.soil_size_width} x ${form.soil_size_height} m`;
        const buildingArea =
            form.building_size_width * form.building_size_height;
        const buildingSize = `${form.building_size_width} x ${form.building_size_height} m`;

        let payload = {};

        if (type == 'productProject') {
            payload = {
                type: type,
                title: form.title,
                category_id: form.category,
                sub_category_id: form.subCategory,
                address: form.address,
                is_sold: form.isSold,
                price: parseRupiah(form.price),
                map_url: form.location_link,
                bedroom: form.beds,
                bathroom: form.baths,
                garage: form.carport,
                floor: form.floors,
                certificate: form.ownership,
                soil_area: soilSize,
                land_area: soilArea,
                building_area: buildingArea,
                building_size: buildingSize,
                building_condition: form.building_condition,
                building_direction: form.building_direction,
                electricity_capacity: form.electricity_meter,
                images: form.images,
                project_id: form.project_id,
                floor_plan_image: form.floorplan,
                facilities: form.facilities,
            };
        } else {
            payload = {
                type: type,
                title: form.title,
                category_id: form.category,
                sub_category_id: form.subCategory,
                address: form.address,
                is_sold: form.isSold,
                price: parseRupiah(form.price),
                map_url: form.location_link,
                bedroom: form.beds,
                bathroom: form.baths,
                garage: form.carport,
                floor: form.floors,
                certificate: form.ownership,
                soil_area: soilSize,
                land_area: soilArea,
                building_area: buildingArea,
                building_size: buildingSize,
                building_condition: form.building_condition,
                building_direction: form.building_direction,
                electricity_capacity: form.electricity_meter,
                images: form.images,
                facilities: form.facilities,
            };
        }

        createProperty(payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            <SectionWrapper className={'mt-0 pb-10'}>
                <SectionHeader
                    title='Create Property'
                    detail='Menu ini digunakan untuk membuat property baru'
                />

                <main className='space-y-4'>
                    <ErrorAlert
                        isError={isCreatePropertyError}
                        error={createPropertyError}
                    />

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
                            {categories?.map((cat, i) => (
                                <option key={i} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
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
                            name='subCategory'
                            value={form.subCategory}
                            onChange={handleChange}
                        >
                            <option value=''>Pilih Tipe Property</option>
                            {categories
                                ?.find((cat) => cat.id === form.category)
                                ?.sub_categories?.map((subCat, i) => (
                                    <option key={i} value={subCat.id}>
                                        {subCat.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Status Properti{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <select
                            className='w-full select select-bordered'
                            name='type'
                            defaultValue={0}
                            value={form.isSold}
                            onChange={handleChange}
                        >
                            <option value={0}>Belum terjual</option>
                            <option value={1}>Terjual</option>
                        </select>
                    </div>
                    {category === 'baru' && (
                        <div className='flex flex-wrap items-center w-full space-y-4 gap-x-8 md:flex-nowrap md:space-y-0'>
                            <div className='w-full form-control'>
                                <label className='label'>
                                    <span className='label-text'>
                                        ID Proyek{' '}
                                        <span className='text-red-500'>*</span>
                                    </span>
                                </label>
                                <div className='input-group'>
                                    <span className='font-bold input-group-addon text-primary'>
                                        ID
                                    </span>
                                    <input
                                        name='project_id'
                                        type='text'
                                        className='w-full input input-bordered'
                                        placeholder='Masukkan ID Proyek'
                                        required
                                        value={form.project_id}
                                        onChange={handleChange}
                                    />
                                </div>
                                <label className='label'>
                                    <span className='label-text-alt'>
                                        Silahkan copy atau masukkan ID proyek
                                        dari menu proyek.
                                    </span>
                                </label>
                            </div>
                            <div className='w-full form-control'>
                                <label className='label'>
                                    <span className='label-text'>
                                        Upload Floorplan{' '}
                                        <span className='text-red-500'>*</span>
                                    </span>
                                </label>
                                <input
                                    type='file'
                                    name='floorplan'
                                    className='w-full file-input file-input-bordered'
                                    accept='image/jpeg, image/png, image/jpg'
                                    onChange={handleFloorplanChange}
                                />
                                <label className='label'>
                                    <span className='label-text-alt'>
                                        Format: JPG, PNG, JPEG. Maksimal 5MB
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}
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
                        <div className='input-group'>
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
                        </div>
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
                                    name='address'
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
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Kondisi Bangunan{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <input
                            name='building_condition'
                            type='text'
                            className='w-full input input-bordered'
                            placeholder='Masukkan jenis kepemilikan'
                            required
                            value={form.building_condition}
                            onChange={handleChange}
                        />
                        <label className='label'>
                            <span className='label-text-alt'>
                                Contoh: Siap Huni, Renovasi, dll
                            </span>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Arah Bangunan{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <select
                            className='w-full select select-bordered'
                            name='building_direction'
                            value={form.building_direction}
                            onChange={handleChange}
                        >
                            <option value='' disabled>
                                Pilih arah mata angin{' '}
                            </option>
                            {buildingDirectionList.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='space-y-5'>
                        {form.facilities.length > 0 && (
                            <>
                                <p className='pt-4 text-lg font-semibold text-gray-700'>
                                    Fasilitas Properti ({form.facilities.length}
                                    )
                                </p>

                                <div className='flex flex-wrap items-center gap-4'>
                                    {form.facilities &&
                                        form.facilities.map(
                                            (facility, index) => (
                                                <div
                                                    className='relative h-12 pl-4 pr-12 overflow-hidden text-white bg-primary rounded-xl flexStart'
                                                    key={index}
                                                >
                                                    <p>{facility}</p>
                                                    <button
                                                        className='absolute -translate-y-1/2 top-1/2 right-2'
                                                        onClick={() =>
                                                            handleDeleteFacilities(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='w-6 h-6 text-red-500'
                                                            viewBox='0 0 20 20'
                                                            fill='#fff'
                                                        >
                                                            <path
                                                                fillRule='evenodd'
                                                                d='M10.707 10l4.147 4.146a.5.5 0 01-.708.708L10 10.707l-4.146 4.147a.5.5 0 01-.708-.708L9.293 10 5.146 5.854a.5.5 0 11.708-.708L10 9.293l4.146-4.147a.5.5 0 11.708.708L10.707 10z'
                                                                clipRule='evenodd'
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )
                                        )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Fasilitas Properti{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <div className='input-group'>
                            <input
                                name='facilities'
                                type='text'
                                className='w-full input input-bordered'
                                placeholder='Masukkan nama fasilitas properti'
                                value={formFacilities}
                                onChange={handleFacilitiesChange}
                            />
                            <button
                                className='btn btn-primary'
                                onClick={handleAddFacilities}
                            >
                                Tambah
                            </button>
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

            <SectionWrapper>
                <SectionHeader
                    title='Foto Properti'
                    detail='Menu ini digunakan untuk membuat property baru'
                />

                <main>
                    <div
                        className='flex-col gap-3 px-10 py-20 duration-200 border-2 border-dashed cursor-pointer rounded-2xl flexCenter bg-gray-50 hover:bg-gray-100'
                        onClick={() => fileInputRef.current.click()}
                        ref={fileInputWrapperRef}
                        onDragEnter={() =>
                            fileInputWrapperRef.current.classList.add(
                                'border-primary'
                            )
                        }
                        onDragLeave={() =>
                            fileInputWrapperRef.current.classList.remove(
                                'border-primary'
                            )
                        }
                        onDrop={() =>
                            fileInputWrapperRef.current.classList.remove(
                                'border-primary'
                            )
                        }
                    >
                        <input
                            type='file'
                            className='hidden'
                            onChange={handlePictureChange}
                            ref={fileInputRef}
                            multiple
                        />
                        <h2 className='text-2xl font-semibold text-center text-gray-700'>
                            Click to upload
                        </h2>
                        <p className='text-center text-secondary'>
                            or
                            <span className='text-gray-700'> browse </span>
                            to choose a file
                        </p>
                    </div>

                    {formPicture.length > 0 && (
                        <>
                            <div className='pt-8'>
                                <p className='text-lg font-semibold text-gray-700'>
                                    Preview Foto ({formPicture.length})
                                </p>
                            </div>

                            <div className='grid grid-cols-2 gap-4 mt-8 lg:grid-cols-3'>
                                {formPicture &&
                                    formPicture.map((picture, index) => (
                                        <div
                                            className='relative overflow-hidden bg-gray-200 h-72 rounded-xl'
                                            key={index}
                                        >
                                            <img
                                                src={picture}
                                                alt='Upload'
                                                className='object-cover w-full h-full'
                                            />

                                            <div className='absolute top-2 right-2'>
                                                <button
                                                    type='button'
                                                    className='text-white btn btn-error'
                                                    onClick={() =>
                                                        handleDeletePicture(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                </main>

                <div className='flex justify-end gap-4 pt-8 pb-2 mt-10 border-t border-borderPrimary'>
                    <button
                        type='button'
                        className='text-white btn btn-error'
                        onClick={() => navigate('/property')}
                    >
                        Batalkan
                    </button>
                    <button
                        type='submit'
                        className='text-white btn btn-info'
                        disabled={isCreatePropertyLoading}
                    >
                        {isCreatePropertyLoading ? (
                            <PulseLoader size={8} color='#fff' />
                        ) : (
                            'Simpan'
                        )}
                    </button>
                </div>
            </SectionWrapper>
        </form>
    );
}
