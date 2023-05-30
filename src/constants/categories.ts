import {
  FiBriefcase,
  FiHeart,
  FiHome,
  FiMonitor,
  FiServer,
  FiSettings,
  FiShoppingBag,
  FiSmile,
  FiSun,
  FiSunrise,
  FiTruck,
} from 'react-icons/fi';
import {
  IoConstructOutline,
  IoCubeOutline,
  IoPawOutline,
} from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { CategoriesParams } from '../store/notices/notices.types';

export interface CategoriesWithIcons extends CategoriesParams {
  icon: IconType;
}
export const CATEGORIES: CategoriesWithIcons[] = [
  {
    _id: '1',
    name: 'Техніка',
    icon: FiMonitor,
  },
  {
    _id: '2',
    name: 'Одяг та взуття',
    icon: FiShoppingBag,
  },
  {
    _id: '3',
    name: 'Спорт',
    icon: FiSmile,
  },
  {
    _id: '4',
    name: 'Транспорт',
    icon: FiTruck,
  },
  {
    _id: '5',
    name: 'Рослини',
    icon: FiSun,
  },
  {
    _id: '6',
    name: 'Краса',
    icon: FiHeart,
  },
  {
    _id: '7',
    name: 'Шукаю роботу',
    icon: FiBriefcase,
  },
  {
    _id: '8',
    name: 'Нерухомість',
    icon: FiHome,
  },
  {
    _id: '9',
    name: 'Тварини',
    icon: IoPawOutline,
  },
  {
    _id: '10',
    name: 'Дитячий світ',
    icon: FiSunrise,
  },
  {
    _id: '11',
    name: 'Хобі',
    icon: IoCubeOutline,
  },
  {
    _id: '12',
    name: 'Авто запчастини',
    icon: FiSettings,
  },
  {
    _id: '13',
    name: 'Дім і сад',
    icon: FiHome,
  },
  {
    _id: '14',
    name: 'Робота в Україні',
    icon: FiBriefcase,
  },
  {
    _id: '15',
    name: 'Будівництво',
    icon: IoConstructOutline,
  },
  {
    _id: '16',
    name: 'Обладнання',
    icon: FiServer,
  },
];
