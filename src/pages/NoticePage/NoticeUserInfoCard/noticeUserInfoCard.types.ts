import { CitiesParams } from '../../../store/notices/notices.types';
import { UserParams } from '../../../store/user/user.types';

export interface NoticeUserInfoCardProps {
  user?: UserParams;
  city?: CitiesParams;
}
