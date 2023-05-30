import { ChangeEventHandler, FC } from 'react';

import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { CharacteristicParams } from '../../../store/notices/notices.types';

import { SELL_SPECS_CHARACKTERISTICS_INPUT_REQUIRED } from './sellSpecs.settings';

interface SellSpecsProps {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  characteristics: CharacteristicParams[];
}
export const SellSpecs: FC<SellSpecsProps> = ({
  onInputChange: handleInputChange,
  characteristics,
}) => {
  return (
    <div>
      <ul>
        {characteristics.map(characteristic => {
          return (
            <li key={characteristic.name}>
              <CustomTextInput
                className={'border-b-2 w-2/3'}
                name={characteristic.name}
                onChange={handleInputChange}
                placeholder={'Введіть ' + characteristic.name}
                required={SELL_SPECS_CHARACKTERISTICS_INPUT_REQUIRED}
                title={characteristic.name}
                type={characteristic.type}
                value={characteristic?.value}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
