import type { Category } from '../types';
import { images } from './images';

export const categories: Category[] = [
  {
    slug: 'perenosnye-filtry',
    name: 'Переносные фильтры',
    shortName: 'Переносные',
    description:
      'Компактные фильтры без подключения к электричеству. Подходят для дома, дачи и поездок.',
    image: images.scenarioTravel,
    imageAlt: 'Походная сцена у воды — сценарий использования переносного фильтра',
  },
  {
    slug: 'magistralnye-filtry',
    name: 'Магистральные фильтры',
    shortName: 'Магистральные',
    description:
      'Стационарные решения для дома. Ассортимент этой категории готовится к публикации.',
    image: images.productHome,
    imageAlt: 'Светлый домашний интерьер у воды — сценарий для магистрального фильтра',
  },
  {
    slug: 'smennye-kartridzhi',
    name: 'Сменные картриджи',
    shortName: 'Картриджи',
    description:
      'Расходные материалы к фильтрам АКВАСОТА. Карточки появятся после подтверждения ассортимента.',
    image: images.membrane,
    imageAlt: 'Макрофотография волокнистого фильтрующего материала',
  },
  {
    slug: 'aksessuary',
    name: 'Аксессуары',
    shortName: 'Аксессуары',
    description: 'Комплектующие для переносных фильтров, включая трубку для отвода воды.',
    image: images.productTube,
    imageAlt: 'Нейтральный производственный кадр комплектующих',
  },
];
