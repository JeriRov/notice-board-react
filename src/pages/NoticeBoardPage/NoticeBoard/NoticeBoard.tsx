import React, { FC } from 'react';

import ReactPaginate from 'react-paginate';

import { AppLoader } from '../../../components/AppLoader/AppLoader';
import { Container } from '../../../containers/Container/Container';
import { usePageParam } from '../../../hooks/usePageParam';
import { NoticeBoardDataParams } from '../../../store/notices/notices.types';
import { NoticeList } from '../NoticeList/NoticeList';

import {
  NOTICE_PAGE_SIZE,
  PAGINATE_BREAK_LABEL,
  PAGINATE_PAGE_RANGE_DISPLAYED,
} from './noticeBoard.settings';

interface NoticeBoardProps {
  data?: NoticeBoardDataParams;
  onClickItem: (id: string | undefined) => void;
  isLoading: boolean;
  isFetching: boolean;
  error?: unknown;
}
export const NoticeBoard: FC<NoticeBoardProps> = ({
  data,
  onClickItem: handleClickItem,
  isLoading,
  isFetching,
  error,
}) => {
  const { page, setPage } = usePageParam();
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };
  if (isLoading || isFetching) {
    return (
      <p className="mt-4 w-full flex items-center justify-center">
        <AppLoader />
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-4 w-full flex items-center justify-center">
        Error while loading notices
      </p>
    );
  }

  if (data?.noticesCount === 0) {
    return (
      <p className="mt-4 w-full flex items-center justify-center">
        No notices are here yet.
      </p>
    );
  }
  return (
    <Container>
      <div className={'px-32'}>
        <NoticeList list={data?.notices} onClick={handleClickItem} />
        <nav className="my-6">
          <ReactPaginate
            activeClassName="active group mb-1"
            activeLinkClassName="group-[.active]:bg-swipesell-red-500 group-[.active]:text-white group-[.active]:border-swipesell-red-500"
            breakLabel={PAGINATE_BREAK_LABEL}
            breakLinkClassName={
              'p-4 px-5 text-swipesell-slate-900 bg-white border border-swipesell-slate-200 -ml-px group-[&:nth-child(2)]:rounded group-[&:nth-last-child(2)]:rounded-r hover:bg-swipesell-slate-200'
            }
            className={'flex justify-center mb-10'}
            containerClassName="flex"
            forcePage={page}
            nextLabel={null}
            onPageChange={handlePageChange}
            pageClassName="group"
            pageCount={Math.ceil((data?.noticesCount || 0) / NOTICE_PAGE_SIZE)}
            pageLinkClassName="p-4 px-5 text-swipesell-slate-900 bg-white border border-swipesell-slate-200 -ml-px group-[&:nth-child(2)]:rounded group-[&:nth-last-child(2)]:rounded-r hover:bg-swipesell-slate-200"
            pageRangeDisplayed={PAGINATE_PAGE_RANGE_DISPLAYED}
            previousLabel={null}
          />
        </nav>
      </div>
    </Container>
  );
};
