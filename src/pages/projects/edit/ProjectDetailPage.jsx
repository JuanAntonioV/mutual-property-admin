import { MdLocationOn, MdMyLocation } from 'react-icons/md';
import SectionHeader from '../../../components/headers/SectionHeader';
import SectionWrapper from '../../../components/wrappers/SectionWrapper';
import { HiDocumentText } from 'react-icons/hi';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { BsEnvelopeFill, BsTelephoneFill } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getAllPropertyProjectApi,
    getProjectDetailApi,
    updateProjectApi,
} from '../../../api/project-api';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatRupiah, parseRupiah } from '../../../utils/helpers';
import LazyImage from '../../../components/handler/LazyImage';
import ScreenLoading from '../../../components/handler/ScreenLoading';
import { useEffect } from 'react';
import MainTable from '../../../components/tables/MainTable';
import { useMemo } from 'react';
import CategoryBadge from '../../../components/badges/CategoryBadge';
import { dateFormater, textDotsFormat } from '../../../utils/formaters';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { deletePropertyApi } from '../../../api/property-api';

export default function EditProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editorData, setEditorData] = useState('');
    const [logoImg, setLogoImg] = useState('');
    const [projectForm, setProjectForm] = useState({
        name: '',
        email: '',
        price: '',
        address: '',
        map_url: '',
        status: 0,
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

    const handleImageOnLogoFormChange = (e) => {
        const { files } = e.target;
        const uploaded = files[0];
        setLogoImg(URL.createObjectURL(uploaded));
        setProjectForm((prev) => ({
            ...prev,
            logo_image: uploaded,
        }));
    };

    const queryClient = useQueryClient();

    const { data: projectData, isLoading: isProjectLoading } = useQuery(
        ['projectDetail'],
        () => getProjectDetailApi(id),
        {
            select: (res) => res.results,
            onSuccess: () => {
                queryClient.invalidateQueries('projects');
                queryClient.invalidateQueries(['projectDetail']);
            },
        }
    );

    useEffect(() => {
        if (projectData) {
            const priceFormated = formatRupiah(`${projectData?.started_price}`);

            setProjectForm((prev) => ({
                ...prev,
                name: projectData?.name,
                email: projectData?.email,
                price: priceFormated,
                status: projectData?.status ? 1 : 0,
                address: projectData?.address,
                map_url: projectData?.map_url,
                area: projectData?.detail.area,
                total_unit: projectData?.detail.total_unit,
                certificate: projectData?.detail.certificate,
                facilities: projectData?.detail.facilities,
                phone_number: projectData?.phone_number,
                whatsapp_number: projectData?.whatsapp_number,
                brochure_file: projectData?.detail.brochure_file,
                price_list_image: projectData?.detail.price_list_image,
                side_plan_image: projectData?.detail.side_plan_image,
                logo_image: projectData?.logo,
            }));

            setLogoImg(projectData?.logo);
            projectData?.description && setEditorData(projectData?.description);
        }
    }, [projectData]);

    const { mutate: updateProject, isLoading: isUpdatingProjectLoading } =
        useMutation((payload) => updateProjectApi(payload), {
            onSuccess: () => {
                toast.success('Project berhasil diupdate');
                queryClient.invalidateQueries('projects');
                queryClient.invalidateQueries(['projectDetail']);
                navigate('/projects');
            },
            onError: () => {
                toast.error('Project gagal diupdate');
            },
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: projectForm.name,
            email: projectForm.email,
            started_price: parseRupiah(projectForm.price) || 0,
            address: projectForm.address,
            map_url: projectForm.map_url,
            status: projectForm.status,
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
        };

        updateProject({ projectId: id, data: payload });
    };

    const { data: propertyProject, isLoading: isPropertyProjectLoading } =
        useQuery(['propertyProject'], () => getAllPropertyProjectApi(id), {
            select: (res) => res.results,
        });

    const { mutate: deleteProperty, isLoading: isDeletePropertyLoading } =
        useMutation(deletePropertyApi, {
            onSuccess: () => {
                toast.success('Berhasil menghapus property');
            },
            onError: () => {
                toast.error('Gagal menghapus property');
            },
        });

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'count',
            },
            {
                Header: 'Nama Properti',
                accessor: 'propertyName',
            },
            {
                Header: 'Categori Properti',
                accessor: 'category',
            },
            {
                Header: 'Tipe Properti',
                accessor: 'type',
            },
            {
                Header: 'Tanggal Posting',
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
        return propertyProject
            ? propertyProject?.product?.map((item) => {
                  return {
                      count: count++,
                      propertyName: textDotsFormat(item?.title, 20),
                      category: (
                          <CategoryBadge
                              status={item?.category.id}
                              statusText={item?.category?.name}
                          />
                      ),
                      type: item?.sub_category?.name,
                      postedAt: dateFormater(item?.created_at),
                      action: (
                          <div className='space-x-4'>
                              <button
                                  className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit'
                                  onClick={() =>
                                      navigate(`/property/${item.id}`)
                                  }
                              >
                                  <AiOutlineFileSearch size={20} />
                              </button>
                              <button
                                  className='bg-red-500 hover:bg-red-600 btn btn-sm hover:text-inherit'
                                  onClick={() => deleteProperty(item.id)}
                                  disabled={isDeletePropertyLoading}
                              >
                                  {isDeletePropertyLoading ? (
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
    }, [propertyProject]);

    if (isProjectLoading) return <ScreenLoading />;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <SectionWrapper className='mt-2'>
                    <SectionHeader
                        title='Edit Project'
                        detail='Menu ini digunakan untuk merubah data project'
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
                        <div className='w-full form-control'>
                            <label className='label'>
                                <span className='label-text'>Status</span>
                            </label>
                            <select
                                name='status'
                                className='select select-bordered'
                                disabled={isUpdatingProjectLoading}
                                value={projectForm.status}
                                onChange={handleInputChange}
                            >
                                <option value={''} disabled>
                                    Pilih Status
                                </option>
                                <option value={1}>Aktif</option>
                                <option value={0}>Tidak Aktif</option>
                            </select>
                            <label className='label'>
                                <span className='label-text-alt'>
                                    Dengan mengubah status menjadi tidak aktif,
                                    maka user tidak dapat mengakses aplikasi
                                </span>
                            </label>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>
                                    Nama Developer{' '}
                                    <span className='text-red-500'>*</span>
                                </span>
                            </label>
                            <input
                                name='name'
                                type='text'
                                onChange={handleInputChange}
                                value={projectForm.name}
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
                                accept={'image/*'}
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
                                <span className='font-bold text-primary'>
                                    Rp
                                </span>
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
                                    Harga ini akan ditampilkan pada informasi
                                    utama proyek
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
                                    Silahkan masukkan luas area proyek dalam
                                    satuan m<sup>2</sup>
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
                                <span className='label-text'>
                                    Fasiitas Proyek
                                </span>
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
                                        <IoLogoWhatsapp
                                            size={23}
                                            color='#213D77'
                                        />
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
                                disabled={isUpdatingProjectLoading}
                            >
                                {isUpdatingProjectLoading ? (
                                    <PulseLoader size={10} color='#fff' />
                                ) : (
                                    'Simpan'
                                )}
                            </button>
                        </div>
                    </footer>
                </SectionWrapper>
            </form>

            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='List Properti'
                    detail='Menu ini digunakan untuk melihat list properti yang terdaftar pada project ini'
                />

                <MainTable
                    columns={columns}
                    data={data}
                    isLoading={isPropertyProjectLoading}
                />
            </SectionWrapper>
        </>
    );
}
