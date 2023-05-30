import React, { FormEvent, useEffect, useState } from 'react';

import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiArrowRight, FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CategorySelector } from '../../../components/CategorySelector/CategorySelector';
import { CitySearchSelector } from '../../../components/CitySearchSelector/CitySearchSelector';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { routes } from '../../../constants/routes';
import { WhiteCard } from '../../../containers/WhiteCard/WhiteCard';
import {
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetNoticeByIdQuery,
  useUpdateNoticeMutation,
} from '../../../services/notices/noticesApi';
import { useAuth } from '../../../store/auth/useAuth';
import {
  CategoriesParams,
  CharacteristicParams,
  CitiesParams,
  NoticeParams,
} from '../../../store/notices/notices.types';
import { SellSpecs } from '../SellSpecs/SellSpecs';

import {
  CATEGORY,
  CITY,
  DESCRIPTION,
  EDIT_NOTICE_ICON_SIZE,
  EDIT_NOTICE_SERVER_ERROR_MESSAGE,
  NOTICE,
  PRICE,
  PRICE_REGEX,
  SUBMIT,
} from './editNoticePage.settings';

export const EditNoticePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoriesParams>(
    {} as CategoriesParams,
  );
  const [itemDetails, setItemDetails] =
    useState<Map<string, CharacteristicParams>>();
  const [characteristics, setCharacteristics] =
    useState<CharacteristicParams[]>();
  const [description, setDescription] = useState('');
  const [cities, setCities] = useState<CitiesParams[]>();
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [userId, setUserId] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const categoriesQuery = useGetCategoriesQuery(undefined);
  const citiesQuery = useGetCitiesQuery(undefined);
  const noticeQuery = useGetNoticeByIdQuery({ id: id || '' });
  const [triggerUpdateNotice] = useUpdateNoticeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(noticeQuery.data?.title || '');
    setSelectedCategory(
      (noticeQuery.data?.item.category as CategoriesParams) ||
        ({} as CategoriesParams),
    );
    const itemsFetch = new Map<string, CharacteristicParams>();
    noticeQuery.data?.item.category.characteristics.forEach(item => {
      itemsFetch.set(item.name, {
        type: item.type,
        name: item.name,
        value: item.value,
      });
    });
    setCharacteristics(noticeQuery.data?.item.category.characteristics);
    setDescription(noticeQuery.data?.description || '');
    setItemDetails(itemsFetch);
    setPrice(noticeQuery.data?.item.price.toString() || '');
    setCity(noticeQuery.data?.city || '');
    setPhotos(noticeQuery.data?.photos || []);
    setUserId(noticeQuery.data?.userId || '');
    setCities(
      citiesQuery.data?.cities.map(city => {
        const str = city.objectName.slice(1).toLowerCase();
        return { ...city, objectName: city.objectName[0] + str };
      }),
    );
  }, [
    categoriesQuery.data?.categories,
    citiesQuery.data?.cities,
    id,
    noticeQuery.data?.city,
    noticeQuery.data?.description,
    noticeQuery.data?.item.category,
    noticeQuery.data?.item.category.characteristics,
    noticeQuery.data?.item.category.name,
    noticeQuery.data?.item.price,
    noticeQuery.data?.photos,
    noticeQuery.data?.title,
    noticeQuery.data?.userId,
    user?.id,
  ]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const selectedCategory = categoriesQuery.data?.categories.find(
      item => item.name === category,
    );
    setCharacteristics(selectedCategory?.characteristics);
    setSelectedCategory(selectedCategory || ({} as CategoriesParams));
    setItemDetails(new Map<string, CharacteristicParams>());
  };

  const handleSelectCity = (city: string) => {
    setCity(city);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const items = new Map<string, CharacteristicParams>(itemDetails);

    items.set(name, { name, value, type });
    setItemDetails(items);
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

    const notice: NoticeParams = {
      _id: noticeQuery.data?._id || '',
      title: target.title.value,
      description: target.description.value,
      dateAdded: Date.now().toString(),
      userId,
      photos,
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
      const data = await triggerUpdateNotice(notice).unwrap();
      navigate(`${routes.notices.path}/${data._id}`);
    } catch (error) {
      toast.error(EDIT_NOTICE_SERVER_ERROR_MESSAGE);
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.match(PRICE_REGEX)) {
      setPrice(value);
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
            onChange={handleTitleChange}
            pattern={NOTICE.pattern}
            placeholder={NOTICE.placeholder}
            required={NOTICE.required}
            title={NOTICE.title}
            value={title}>
            <FiArrowRight size={EDIT_NOTICE_ICON_SIZE} />
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

        {!!selectedCategory && (
          <WhiteCard className={'flex-col px-24 mb-10'}>
            <SellSpecs
              characteristics={characteristics || []}
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
            onChange={handleDescriptionChange}
            placeholder={DESCRIPTION.placeholder}
            rows={DESCRIPTION.rows}
            value={description}
          />
        </WhiteCard>

        <WhiteCard className={'flex-col px-24 mb-10'}>
          <label>Ціна</label>
          <div className={'flex flex-row items-center'}>
            <CustomTextInput
              className={'border-b-2 border-swipesell-slate-400 text-xl w-1/6'}
              name={PRICE.name}
              onChange={handlePriceChange}
              pattern={PRICE.pattern}
              placeholder={PRICE.placeholder}
              required={PRICE.required}
              type={PRICE.type}
              value={price}>
              <FaRegMoneyBillAlt size={EDIT_NOTICE_ICON_SIZE} />
            </CustomTextInput>
            <label className={'pl-5 text-xl'}>грн.</label>
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
            value={city}
          />
        </WhiteCard>

        <div className={'pr-52 pb-5 flex justify-end'}>
          <CustomButton
            className={'w-1/4'}
            title={SUBMIT.title}
            type={'submit'}>
            <FiEdit size={EDIT_NOTICE_ICON_SIZE} />
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
