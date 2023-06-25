import SectionWrapper from '@/components/wrappers/SectionWrapper';
import MainTable from '@/components/tables/MainTable';
import { useMemo } from 'react';

import { AiOutlineFileSearch } from 'react-icons/ai';
import SectionHeader from '@/components/headers/SectionHeader';
import { useQuery } from '@tanstack/react-query';
import { getAllNewPostApi } from '../../../api/property-api';
import { dateFormater, textDotsFormat } from '../../../utils/formaters';
import { useNavigate } from 'react-router-dom';

export default function NewPostSection() {
    const navigate = useNavigate();

    const { data: newPosts, isLoading: isNewPostLoading } = useQuery(
        ['newPosts'],
        getAllNewPostApi,
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
        return newPosts
            ? newPosts.map((post) => {
                  return {
                      count: count++,
                      propertyName: textDotsFormat(post.title, 40),
                      category: post.category.name,
                      type: post.sub_category.name,
                      postedAt: dateFormater(post.created_at),
                      action: (
                          <div className='space-x-4'>
                              <button
                                  className='btn btn-outline btn-sm hover:bg-gray-100 hover:text-inherit'
                                  onClick={() =>
                                      navigate(`/property/${post.id}`)
                                  }
                              >
                                  <AiOutlineFileSearch size={20} />
                              </button>
                          </div>
                      ),
                  };
              })
            : [];
    }, [newPosts]);

    return (
        <SectionWrapper>
            <SectionHeader
                title={'Property Terbaru'}
                detail={'List property terbaru yang ditambahkan'}
            />

            <MainTable
                data={data}
                columns={columns}
                isLoading={isNewPostLoading}
            />
        </SectionWrapper>
    );
}
