import { NoticeParams } from '../../../store/notices/notices.types';

export interface NoticeItemProps {
  notice: NoticeParams;
  onClick: (id: string | undefined) => void;
}
