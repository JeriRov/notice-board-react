import React, { FormEvent, useEffect, useState } from 'react';

import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiArrowRight, FiShare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { CitySearchSelector } from '../../components/CitySearchSelector/CitySearchSelector';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';
import { ImageUploader } from '../../components/ImageUploader/ImageUploader';
import { routes } from '../../constants/routes';
import { WhiteCard } from '../../containers/WhiteCard/WhiteCard';
import {
  useCreateNoticeMutation,
  useGetCategoriesQuery,
  useGetCitiesQuery,
} from '../../services/notices/noticesApi';
import { useAuth } from '../../store/auth/useAuth';
import {
  CategoriesParams,
  CharacteristicParams,
  CitiesParams,
  NoticeParams,
} from '../../store/notices/notices.types';
import { uploadImagesToFirebase } from '../../utils/utils';

import {
  CATEGORY,
  CITY,
  NOTICE,
  PRICE,
  SUBMIT,
} from './EditNoticePage/editNoticePage.settings';
import { SellSpecs } from './SellSpecs/SellSpecs';

import { DESCRIPTION, NOTICE_ICON_SIZE } from './sellPage.settings';

export const SellPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<CategoriesParams>();
  const [itemDetails, setItemDetails] =
    useState<Map<string, CharacteristicParams>>();
  const [cities, setCities] = useState<CitiesParams[]>();
  const [images, setImages] = useState<FileList | null>();
  const categoriesQuery = useGetCategoriesQuery(undefined);
  const citiesQuery = useGetCitiesQuery(undefined);
  const [triggerCreateNotice] = useCreateNoticeMutation();
  const navigate = useNavigate();
  useEffect(() => {
    setCities(citiesQuery.data?.cities);
  }, [citiesQuery.data?.cities]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const selectedCategory = categoriesQuery.data?.categories.find(
      item => item.name === category,
    );
    setSelectedCategory(selectedCategory);
    setItemDetails(new Map<string, CharacteristicParams>());
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelectCity = (city: string) => {
    // TODO: handle city selection
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const items = new Map<string, CharacteristicParams>(itemDetails);

    items.set(name, { name, value, type });
    setItemDetails(items);
  };

  const handleSetImages = (photos: FileList | null) => {
    setImages(photos);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      category: { value: string };
      description: { value: string };
      price: { value: string };
      city: { value: string };
    };

    if (!itemDetails) {
      return;
    }

    const imagesURIs: string[] | undefined = await uploadImagesToFirebase(
      images,
    );

    const notice: NoticeParams = {
      title: target.title.value,
      description: target.description.value,
      dateAdded: Date.now().toString(),
      photos: imagesURIs,
      userId: user?.id,
      city: target.city.value,
      item: {
        price: parseInt(target.price.value),
        category: {
          name: target.category.value,
          characteristics: Array.from(
            itemDetails.values(),
          ) as CharacteristicParams[],
        },
      },
    };

    try {
      const data = await triggerCreateNotice(notice).unwrap();
      navigate(`${routes.notices.path}/${data._id}`);
    } catch (error) {
      toast.error('Помилка при створенні оголошення');
    }
  };

  return (
    <div className={'mx-32'}>
      <form className="w-full font-poppins" onSubmit={handleSubmit}>
        <h1 className={'ml-10 mt-10 mb-8 text-4xl'}>Форма оголошення</h1>
        <WhiteCard className={'flex-col px-24 mb-10'}>
          <CustomTextInput
            className={'px-1 border-b-2 border-swipesell-slate-400 w-2/3 mb-6'}
            name={NOTICE.name}
            pattern={NOTICE.pattern}
            placeholder={NOTICE.placeholder}
            required={NOTICE.required}
            title={NOTICE.title}>
            <FiArrowRight size={NOTICE_ICON_SIZE} />
          </CustomTextInput>
          <label className="block mb-4 w-1/5">
            Категорія:
            <CategorySelector
              categories={categoriesQuery.data?.categories || []}
              className={
                'border-b-2 border-swipesell-slate-400 focus:border-swipesell-slate-600'
              }
              name={CATEGORY.name}
              onChange={handleCategoryChange}
              required={CATEGORY.required}
              selectedCategory={selectedCategory?.name || ''}
            />
          </label>
        </WhiteCard>

        <WhiteCard className={'flex-col px-24 mb-10'}>
          <h1 className={'font-bold text-xl'}>Фото</h1>
          <ImageUploader onPhoto={handleSetImages} />
        </WhiteCard>

        {!!selectedCategory && (
          <WhiteCard className={'flex-col px-24 mb-10'}>
            <SellSpecs
              characteristics={selectedCategory.characteristics || []}
              onInputChange={handleInputChange}
            />
          </WhiteCard>
        )}
        <WhiteCard className={'flex-col px-24 mb-10'}>
          <label
            className="block mb-2 text-swipesell-slate-800"
            htmlFor={DESCRIPTION.id}>
            Опис
          </label>
          <textarea
            className="block p-2.5 w-2/3 text-gray-500 rounded border-b-2 border-swipesell-slate-400 focus:outline-none"
            id={DESCRIPTION.id}
            name={DESCRIPTION.name}
            placeholder={DESCRIPTION.placeholder}
            rows={DESCRIPTION.rows}
          />
        </WhiteCard>

        <WhiteCard className={'flex-col px-24 mb-10'}>
          <label>Ціна</label>
          <div className={'flex flex-row items-center'}>
            <CustomTextInput
              className={'border-b-2 border-swipesell-slate-400 text-xl w-1/6'}
              name={PRICE.name}
              pattern={PRICE.pattern}
              placeholder={PRICE.placeholder}
              required={PRICE.required}
              type={PRICE.type}>
              <FaRegMoneyBillAlt size={NOTICE_ICON_SIZE} />
            </CustomTextInput>
            <label className={'pl-5 text-xl'}>Грн.</label>
          </div>
        </WhiteCard>

        <WhiteCard className={'flex-col px-24 mb-10'}>
          <label>Місто</label>
          <CitySearchSelector
            cities={cities}
            className={'border-b-2 border-swipesell-slate-400'}
            name={CITY.name}
            onSelectCity={handleSelectCity}
            required={CITY.required}
          />
        </WhiteCard>

        <div className={'pr-52 pb-5 flex justify-end'}>
          <CustomButton className={'w-1/4'} title={SUBMIT.title} type="submit">
            <FiShare size={NOTICE_ICON_SIZE} />
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
