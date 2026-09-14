import type { Category } from '../types';
import { images } from './images';

export const categories: Category[] = [
  {
    slug: 'perenosnye-filtry',
    name: 'Переносные фильтры',
    shortName: 'Переносные',
    description:
      'Компактные фильтры без подключения к электричеству. Подходят для дома, дачи и поездок.',
    image: images.portableKit,
    imageAlt: 'Комплектация переносного фильтра Аквасота-2: фильтр, трубка и сумка',
  },
  {
    slug: 'magistralnye-filtry',
    name: 'Магистральные фильтры',
    shortName: 'Магистральные',
    description:
      'Стационарные решения для дома. Ассортимент этой категории готовится к публикации.',
    image: images.scenarioHome,
    imageAlt: 'Чистая вода на современной кухне',
  },
  {
    slug: 'smennye-kartridzhi',
    name: 'Сменные картриджи',
    shortName: 'Картриджи',
    description: 'Сменные элементы к фильтрам АКВАСОТА, включая тканевый фильтр АС-ТФ1.',
    image: images.filterAsTf1,
    imageAlt: 'Тканевый фильтр АС-ТФ1 для Аквасота-1',
  },
  {
    slug: 'aksessuary',
    name: 'Аксессуары',
    shortName: 'Аксессуары',
    description: 'Комплектующие: трубка для отвода воды и накопительные баки разных объёмов.',
    image: images.tank28Gal,
    imageAlt: 'Накопительный бак для систем очистки воды',
  },
];
