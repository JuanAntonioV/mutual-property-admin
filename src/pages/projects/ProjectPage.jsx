import { useMemo } from 'react';
import SectionHeader from '../../components/headers/SectionHeader';
import SectionWrapper from '../../components/wrappers/SectionWrapper';
import { AiOutlineFileSearch } from 'react-icons/ai';
import MainTable from '../../components/tables/MainTable';
import { useNavigate } from 'react-router-dom';
import { BiCopy } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import { getAllProjectApi } from '../../api/project-api';
import StatusBadge from '../../components/badges/StatusBadge';
import { dateFormater, textDotsFormat } from '../../utils/formaters';
import { toast } from 'react-toastify';

export default function ProjectPage() {
    const navigate = useNavigate();

    const { data: projectData, isLoading: isProjectLoading } = useQuery(
        ['projects'],
        getAllProjectApi,
        {
            select: (res) => res.results,
        }
    );

    const columns = useMemo(
        () => [
            {
                Header: 'ID Project',
                accessor: 'id',
            },
            {
                Header: 'Nama Developer',
                accessor: 'name',
            },
            {
                Header: 'Alamat Developer',
                accessor: 'address',
            },
            {
                Header: 'Total Unit',
                accessor: 'totalUnits',
            },
            {
                Header: 'Status',
                accessor: 'status',
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
        return projectData
            ? projectData.map((project) => {
                  return {
                      id: project.id,
                      name: project.name,
                      status: <StatusBadge status={project.status} />,
                      address: textDotsFormat(project.address, 36),
                      postedAt: dateFormater(project.created_at),
                      totalUnits: project.detail.total_unit,
                      action: (
                          <div className='space-x-4'>
                              <div
                                  className='tooltip tooltip-info tooltip-bottom'
                                  data-tip='Copy Project ID'
                                  onClick={() =>
                                      navigator.clipboard.writeText(
                                          project.id
                                      ) && toast.success('Project ID di copy')
                                  }
                              >
                                  <button className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit'>
                                      <BiCopy size={20} />
                                  </button>
                              </div>
                              <button
                                  className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit'
                                  onClick={() =>
                                      navigate(`/projects/${project.id}`)
                                  }
                              >
                                  <AiOutlineFileSearch size={20} />
                              </button>
                          </div>
                      ),
                  };
              })
            : [];
    }, [projectData]);

    const handleAddNewProject = () => {
        navigate('create');
    };

    return (
        <>
            <SectionWrapper className='mt-2'>
                <SectionHeader
                    title='Project'
                    detail='Menu ini digunakan untuk mengelola data project yang ada di aplikasi.'
                />

                <MainTable
                    data={data}
                    columns={columns}
                    addAction={handleAddNewProject}
                    isLoading={isProjectLoading}
                />
            </SectionWrapper>
        </>
    );
}
