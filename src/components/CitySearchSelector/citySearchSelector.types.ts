import { CitiesParams } from '../../store/notices/notices.types';

export interface SelectCityProps {
  cities?: CitiesParams[];
  onSelectCity: (city: string) => void;
  className?: string;
  required?: boolean;
  name?: string;
  value?: string;
}
