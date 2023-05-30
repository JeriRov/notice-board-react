export const NOTICE = {
  name: 'title',
  title: 'Назва товару',
  placeholder: 'Введіть назву товару',
  required: true,
  pattern: '{3,}',
};
export const CATEGORY = {
  name: 'category',
  required: true,
};
export const DESCRIPTION = {
  id: 'description',
  name: 'description',
  placeholder:
    'Подумайте, які подробиці ви хотіли б дізнатись з оголошення. І додайте їх в опис',
  rows: 4,
};

export const PRICE = {
  name: 'price',
  pattern: '[0-9]',
  placeholder: 'Введіть ціну',
  required: true,
  type: 'number',
};

export const CITY = {
  name: 'city',
  required: true,
};

export const SUBMIT = {
  type: 'submit',
  title: 'Редагувати',
};
export const NOTICE_SERVER_ERROR_MESSAGE = 'Помилка при створенні оголошення';

export const NOTICE_ICON_SIZE = 28;
export const PRICE_REGEX = /^\d*$/;
