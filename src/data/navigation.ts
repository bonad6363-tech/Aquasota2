import type { NavItem } from '../types';

export const navigation: NavItem[] = [
  { to: '/katalog', label: 'Каталог' },
  { to: '/#podbor', label: 'Подобрать фильтр' },
  { to: '/sravnenie', label: 'Сравнение' },
  { to: '/dostavka-i-oplata', label: 'Доставка и оплата' },
  { to: '/dokumenty', label: 'Документы' },
  { to: '/kontakty', label: 'Контакты' },
];

export const footerNav: NavItem[] = [
  { to: '/katalog', label: 'Каталог' },
  { to: '/dostavka-i-oplata', label: 'Доставка и оплата' },
  { to: '/dokumenty', label: 'Документы' },
  { to: '/o-kompanii', label: 'О компании' },
  { to: '/kontakty', label: 'Контакты' },
  { to: '/politika-konfidencialnosti', label: 'Политика обработки данных' },
];
