import { images } from '../data/images';

/** Оригинальный фирменный логотип АКВАСОТА. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <img className="logo__image" src={images.logo} alt="АКВАСОТА — фильтры для воды" />
    </span>
  );
}
