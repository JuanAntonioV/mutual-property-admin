import { MdLocationOn, MdMyLocation } from 'react-icons/md';
import SectionHeader from '../../../components/headers/SectionHeader';
import SectionWrapper from '../../../components/wrappers/SectionWrapper';
import { HiDocumentText } from 'react-icons/hi';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef, useState } from 'react';
import { BsEnvelopeFill, BsTelephoneFill } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { createProjectApi } from '../../../api/project-api';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { formatRupiah, parseRupiah } from '../../../utils/helpers';
import LazyImage from '../../../components/handler/LazyImage';

export default function CreateProjectPage() {
    const navigate = useNavigate();
    const [editorData, setEditorData] = useState('');
    const [logoImg, setLogoImg] = useState('');
    const [projectForm, setProjectForm] = useState({
        name: '',
        developerName: '',
        email: '',
        price: '',
        address: '',
        map_url: '',
        area: '',
        total_unit: '',
        certificate: '',
        facilities: '',
        phone_number: '',
        whatsapp_number: '',
        brochure_file: '',
        price_list_image: '',
        side_plan_image: '',
        logo_image: '',
        images: [],
    });

    const onChangeImage = (e) => {
        const { name, files } = e.target;
        const uploaded = files[0];

        setProjectForm((prev) => ({
            ...prev,
            [name]: uploaded,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[a-zA-Z0-9.]*$/;
        const numberRegex = /^[0-9]*$/;

        if (name == 'price' && value.match(regex)) {
            const formated = formatRupiah(value);

            setProjectForm((prev) => ({
                ...prev,
                [name]: formated,
            }));
        }

        if (
            name == 'total_unit' ||
            name == 'phone_number' ||
            name == 'whatsapp_number'
        ) {
            if (value.match(numberRegex)) {
                setProjectForm((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }

        if (
            name != 'price' &&
            name != 'phone_number' &&
            name != 'whatsapp_number' &&
            name != 'total_unit'
        ) {
            setProjectForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const [formPicture, setFormPicture] = useState([]);
    const fileInputRef = useRef(null);

    const fileInputWrapperRef = useRef(null);

    const handlePictureChange = (e) => {
        const { files } = e.target;

        const selectedFilesArray = Array.from(files);

        if (selectedFilesArray.length > 10) {
            toast.error('Maksimal 10 gambar');
            return;
        }

        setProjectForm((prev) => ({
            ...prev,
            images: prev.images.concat(selectedFilesArray),
        }));

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setFormPicture((prev) => prev.concat(imagesArray));

        // FOR BUG IN CHROME
        e.target.value = '';
    };

    const handleDeletePicture = (index) => {
        setProjectForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));

        setFormPicture((prev) => prev.filter((_, i) => i !== index));
    };

    const handleImageOnLogoFormChange = (e) => {
        const { files } = e.target;
        const uploaded = files[0];
        setLogoImg(URL.createObjectURL(uploaded));
        setProjectForm((prev) => ({
            ...prev,
            logo_image: uploaded,
        }));
    };

    const { mutate: createProject, isLoading: isCreatingProject } = useMutation(
        (payload) => createProjectApi(payload),
        {
            onSuccess: () => {
                toast.success('Project berhasil dibuat');
                navigate('/projects');
            },
            onError: () => {
                toast.error('Project gagal dibuat');
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: projectForm.name,
            developer_name: projectForm.developerName,
            email: projectForm.email,
            started_price: parseRupiah(projectForm.price),
            address: projectForm.address,
            map_url: projectForm.map_url,
            area: projectForm.area,
            total_unit: projectForm.total_unit,
            certificate: projectForm.certificate,
            facilities: projectForm.facilities,
            phone_number: projectForm.phone_number,
            whatsapp_number: projectForm.whatsapp_number,
            brochure_file: projectForm.brochure_file,
            price_list_image: projectForm.price_list_image,
            side_plan_image: projectForm.side_plan_image,
            logo_image: projectForm.logo_image,
            description: editorData,
            images: projectForm.images,
        };

        createProject(payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Create Project'
                    detail='Menu ini digunakan untuk membuat project baru.'
                />

                {logoImg && (
                    <div className='mb-6 avatar'>
                        <div className='border rounded-lg w-60 aspect-auto border-borderPrimary'>
                            <LazyImage
                                src={logoImg}
                                className='!object-cover !w-60 !h-60'
                            />
                        </div>
                    </div>
                )}

                <main className='space-y-2'>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Nama Proyek{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <input
                            name='name'
                            type='text'
                            onChange={handleInputChange}
                            value={projectForm.name}
                            className='input input-bordered'
                            placeholder='Masukkan nama proyek'
                            required
                        />
                    </div>
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
                            onChange={handleInputChange}
                            value={projectForm.developerName}
                            className='input input-bordered'
                            placeholder='Masukkan nama developer'
                            required
                        />
                    </div>
                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Upload Logo Developer
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <input
                            name='logo_image'
                            type='file'
                            onChange={handleImageOnLogoFormChange}
                            className='w-full file-input file-input-bordered'
                            accept={'.jpg, .png, .jpeg'}
                        />
                        <label className='label'>
                            <span className='label-text-alt'>
                                Format: JPG, PNG, JPEG. Maksimal 5MB
                            </span>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Total Unit Properti{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <input
                            name='total_unit'
                            type='text'
                            onChange={handleInputChange}
                            value={projectForm.total_unit}
                            className='input input-bordered'
                            placeholder='Masukkan total unit properti'
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>
                                Harga Proyek{' '}
                                <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <div className='input-group'>
                            <span className='font-bold text-primary'>Rp</span>
                            <input
                                name='price'
                                type='text'
                                onChange={handleInputChange}
                                value={projectForm.price}
                                className='w-full input input-bordered'
                                placeholder='Masukkan harga proyek'
                                required
                            />
                        </div>
                        <label className='label'>
                            <span className='label-text-alt'>
                                Harga ini akan ditampilkan pada informasi utama
                                proyek
                            </span>
                        </label>
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
                                    name='address'
                                    type='text'
                                    onChange={handleInputChange}
                                    value={projectForm.address}
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
                                    name='map_url'
                                    type='text'
                                    onChange={handleInputChange}
                                    value={projectForm.map_url}
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
                                onChange={handleInputChange}
                                value={projectForm.area}
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
                                name='certificate'
                                type='text'
                                onChange={handleInputChange}
                                value={projectForm.certificate}
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
                            name='facilities'
                            type='text'
                            onChange={handleInputChange}
                            value={projectForm.facilities}
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
                                name='price_list_image'
                                type='file'
                                onChange={onChangeImage}
                                className='w-full file-input file-input-bordered'
                                accept={'.jpg, .png, .jpeg'}
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
                                name='side_plan_image'
                                type='file'
                                onChange={onChangeImage}
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

                    <div className='w-full form-control'>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <div className='input-group'>
                            <span>
                                <BsEnvelopeFill size={23} color='#213D77' />
                            </span>
                            <input
                                name='email'
                                type='text'
                                onChange={handleInputChange}
                                value={projectForm.email}
                                placeholder='Masukkan email developer'
                                className='w-full input input-bordered'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center w-full space-y-4 gap-x-8 md:flex-nowrap'>
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
                                    name='phone_number'
                                    type='text'
                                    onChange={handleInputChange}
                                    value={projectForm.phone_number}
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
                                    name='whatsapp_number'
                                    type='text'
                                    onChange={handleInputChange}
                                    value={projectForm.whatsapp_number}
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
                            name='brochure_file'
                            type='file'
                            onChange={onChangeImage}
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
                            onChange={(_, editor) => {
                                const data = editor.getData();
                                setEditorData(data);
                            }}
                        />
                    </div>
                </main>
            </SectionWrapper>

            <SectionWrapper>
                <SectionHeader
                    title='Foto Proyek'
                    detail='Menu ini digunakan untuk melihat foto proyek'
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
                            and
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

                <footer className='mt-16'>
                    <div className='flex justify-end gap-4'>
                        <Link
                            to={'/projects'}
                            type='button'
                            className='text-white btn btn-error'
                        >
                            Kembali
                        </Link>
                        <button
                            type='submit'
                            className='text-white btn btn-success'
                            disabled={isCreatingProject}
                        >
                            {isCreatingProject ? (
                                <PulseLoader size={10} color='#fff' />
                            ) : (
                                'Buat Project'
                            )}
                        </button>
                    </div>
                </footer>
            </SectionWrapper>
        </form>
    );
}
