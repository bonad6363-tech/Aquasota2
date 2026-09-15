import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { categories } from '../data/categories';
import { products } from '../data/products';
import type { CategorySlug } from '../types';
import { NotFoundPage } from './NotFoundPage';

type SortKey = 'popular' | 'price-asc' | 'price-desc';

export function CatalogPage() {
  const { categorySlug } = useParams();
  const activeCategory = categories.find((item) => item.slug === categorySlug);
  const unknownCategory = Boolean(categorySlug && !activeCategory);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategorySlug | 'all'>(activeCategory?.slug ?? 'all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyStock, setOnlyStock] = useState(false);
  const [sort, setSort] = useState<SortKey>('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setCategory(activeCategory?.slug ?? 'all');
  }, [activeCategory?.slug]);

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const list = products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesPrice = product.price >= min && product.price <= max;
      const matchesStock = !onlyStock || product.inStock;
      return matchesCategory && matchesQuery && matchesPrice && matchesStock;
    });
    return list.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return b.popularity - a.popularity;
    });
  }, [category, query, minPrice, maxPrice, onlyStock, sort]);

  const chips = [
    query ? { id: 'q', label: `Поиск: ${query}` } : null,
    category !== 'all' ? { id: 'cat', label: categories.find((item) => item.slug === category)?.name ?? '' } : null,
    minPrice ? { id: 'min', label: `от ${minPrice} ₽` } : null,
    maxPrice ? { id: 'max', label: `до ${maxPrice} ₽` } : null,
    onlyStock ? { id: 'stock', label: 'В наличии' } : null,
  ].filter((item) => item !== null);

  function reset() {
    setQuery('');
    setCategory(activeCategory?.slug ?? 'all');
    setMinPrice('');
    setMaxPrice('');
    setOnlyStock(false);
    setSort('popular');
  }

  const title = activeCategory ? activeCategory.name : 'Каталог фильтров АКВАСОТА';

  if (unknownCategory) {
    return <NotFoundPage />;
  }

  return (
    <div className="container">
      <Seo
        title={title}
        description={activeCategory?.description ?? 'Переносные фильтры, аксессуары и категории для дома, дачи и поездок.'}
        path={activeCategory ? `/katalog/${activeCategory.slug}` : '/katalog'}
      />
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Каталог', to: '/katalog' },
          ...(activeCategory ? [{ label: activeCategory.name }] : []),
        ]}
      />
      <div className="page-title stack">
        <h1>{title}</h1>
        <p className="lead">{activeCategory?.description ?? 'Ассортимент производителя ООО «АКВАПЛЮС». Цены и наличие — как в текущем каталоге.'}</p>
      </div>

      {!activeCategory ? (
        <div className="cards-4" style={{ margin: '28px 0' }}>
          {categories.map((item) => (
            <Link className="media-card" key={item.slug} to={`/katalog/${item.slug}`}>
              <img src={item.image} alt={item.imageAlt} className="media-card__img" />
              <div className="media-card__body">
                <h3>{item.name}</h3>
                <p className="muted">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}

      <div className="catalog-toolbar">
        <Button className="filters-toggle" variant="secondary" onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontal size={18} /> Фильтры
        </Button>
        <div className="filters filters--row desktop-filters">
          <Filters
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            onlyStock={onlyStock}
            setOnlyStock={setOnlyStock}
            sort={sort}
            setSort={setSort}
            reset={reset}
            lockCategory={Boolean(activeCategory)}
            compact
          />
        </div>
      </div>

      <div className="catalog-main" style={{ marginBottom: 80 }}>
        <div className="stack-lg">
          {chips.length > 0 ? (
            <div className="chips">
              {chips.map((chip) => (
                <button key={chip.id} className="chip" type="button" onClick={reset}>
                  {chip.label} <X size={14} />
                </button>
              ))}
              <button className="chip" type="button" onClick={reset}>
                Сбросить
              </button>
            </div>
          ) : null}
          {filtered.length === 0 ? (
            <div className="empty-note">
              В этой выборке пока нет товаров. Сбросьте фильтры или посмотрите соседнюю категорию.
            </div>
          ) : (
            <div className="cards-3">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen ? (
        <div className="overlay" onClick={() => setFiltersOpen(false)} role="presentation">
          <div className="drawer" onClick={(event) => event.stopPropagation()}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Фильтры</h2>
            <Filters
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              onlyStock={onlyStock}
              setOnlyStock={setOnlyStock}
              sort={sort}
              setSort={setSort}
              reset={reset}
              lockCategory={Boolean(activeCategory)}
            />
            <Button block onClick={() => setFiltersOpen(false)} style={{ marginTop: 16 }}>
              Показать {filtered.length}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Filters(props: {
  query: string;
  setQuery: (value: string) => void;
  category: CategorySlug | 'all';
  setCategory: (value: CategorySlug | 'all') => void;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  onlyStock: boolean;
  setOnlyStock: (value: boolean) => void;
  sort: SortKey;
  setSort: (value: SortKey) => void;
  reset: () => void;
  lockCategory: boolean;
  compact?: boolean;
}) {
  return (
    <>
      <label className="field">
        <span>Поиск</span>
        <input value={props.query} onChange={(event) => props.setQuery(event.target.value)} placeholder="Название" />
      </label>
      <label className="field">
        <span>Категория</span>
        <select
          value={props.category}
          disabled={props.lockCategory}
          onChange={(event) => props.setCategory(event.target.value as CategorySlug | 'all')}
        >
          <option value="all">Все категории</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      {!props.compact ? (
        <>
          <label className="field">
            <span>Цена от</span>
            <input inputMode="numeric" value={props.minPrice} onChange={(event) => props.setMinPrice(event.target.value)} />
          </label>
          <label className="field">
            <span>Цена до</span>
            <input inputMode="numeric" value={props.maxPrice} onChange={(event) => props.setMaxPrice(event.target.value)} />
          </label>
        </>
      ) : null}
      <label className="check">
        <input type="checkbox" checked={props.onlyStock} onChange={(event) => props.setOnlyStock(event.target.checked)} />
        <span>Только в наличии</span>
      </label>
      <label className="field">
        <span>Сортировка</span>
        <select value={props.sort} onChange={(event) => props.setSort(event.target.value as SortKey)}>
          <option value="popular">По популярности</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
        </select>
      </label>
      <Button variant="secondary" onClick={props.reset}>
        Сбросить
      </Button>
    </>
  );
}
