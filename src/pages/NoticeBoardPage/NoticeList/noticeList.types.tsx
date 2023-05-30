import { NoticeParams } from '../../../store/notices/notices.types';

export interface NoticeBoardProps {
  list?: NoticeParams[];
  onClick: (id: string | undefined) => void;
}
