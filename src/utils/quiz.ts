import { products } from '../data/products';
import type { Product } from '../types';

export type QuizPlace = 'home' | 'dacha' | 'travel';
export type QuizPeople = '1-2' | '3-4' | '5+';
export type QuizType = 'portable' | 'stationary';

export interface QuizAnswers {
  place: QuizPlace | null;
  people: QuizPeople | null;
  type: QuizType | null;
}

export interface QuizResult {
  products: Product[];
  note: string;
}

export function getQuizResult(answers: QuizAnswers): QuizResult {
  const portable = products.filter((item) => item.category === 'perenosnye-filtry');
  const compact = portable.find((item) => item.slug === 'akvasota-1');
  const larger = portable.find((item) => item.slug === 'akvasota-2');

  if (answers.type === 'stationary') {
    return {
      products: portable,
      note: 'Магистральные фильтры готовятся к публикации. Пока можно выбрать переносную модель или оставить заявку на консультацию.',
    };
  }

  if (answers.people === '1-2' || answers.place === 'travel') {
    return {
      products: [compact, larger].filter(Boolean) as Product[],
      note: 'Для поездки и небольшой нагрузки удобнее компактная модель. Аквасота-2 даёт большую площадь фильтрации и сорбционную мембрану.',
    };
  }

  return {
    products: [larger, compact].filter(Boolean) as Product[],
    note: 'Для дома и дачи чаще выбирают Аквасота-2: больше размер и есть сорбционная мембрана АС-СМ.',
  };
}
