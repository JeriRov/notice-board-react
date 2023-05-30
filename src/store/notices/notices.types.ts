export enum NoticesEndpoints {
  CATEGORIES = '/categories',
  CITIES = '/cities',
  NOTICES = '/notices',
}
export interface CharacteristicParams {
  name: string;
  type: string;
  value?: string;
}
export interface CategoriesParams {
  _id: string;
  name: string;
  characteristics?: CharacteristicParams[];
}
export interface CategoriesResponseParams {
  categories: CategoriesParams[];
}
export interface CitiesParams {
  _id: string;
  objectName: string;
  objectCategory?: string;
  region?: string;
  community?: string;
}
export interface CitiesResponseParams {
  cities: CitiesParams[];
}
export interface ByIdParams {
  id: string;
}
export interface NoticeQueryParams {
  page?: number;
  isPersonalNotices?: boolean;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  city?: string;
}
export interface ItemCategoryParams {
  name: string;
  characteristics: CharacteristicParams[];
}
export interface ItemParams {
  category: ItemCategoryParams;
  price: number;
}
export interface CityParams {
  cityId: string;
}
export interface NoticeBoardDataParams {
  notices: NoticeParams[];
  noticesCount: number;
}
export interface NoticeParams {
  _id?: string;
  userId?: string;
  featured?: boolean;
  title: string;
  city: string;
  description: string;
  dateAdded: string;
  photos?: string[];
  item: ItemParams;
}
