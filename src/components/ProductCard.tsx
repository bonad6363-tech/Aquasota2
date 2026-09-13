import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';
import type { Product } from '../types';
import { formatPrice } from '../utils/format';
import { Button } from './Button';
import { MediaImg } from './MediaImg';

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const category = categories.find((item) => item.slug === product.category);

  return (
    <article className="product-card">
      <Link to={`/tovar/${product.slug}`}>
        <MediaImg src={product.images[0].src} alt={product.images[0].alt} className="product-card__image" />
      </Link>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{category?.shortName}</span>
          <span className={product.inStock ? 'badge badge--ok' : 'badge badge--wait'}>
            {product.inStock ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>
        <h3>
          <Link to={`/tovar/${product.slug}`}>{product.name}</Link>
        </h3>
        <ul>
          {product.keySpecs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <div className="price-row">
          <span className="price">{product.priceOnRequest ? 'Цена уточняется' : formatPrice(product.price)}</span>
          {product.oldPrice ? <span className="price--old">{formatPrice(product.oldPrice)}</span> : null}
        </div>
        <div className="product-card__actions">
          <Button
            variant={added ? 'success' : 'primary'}
            disabled={!product.inStock || product.priceOnRequest}
            onClick={() => {
              add(product.slug);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1600);
            }}
          >
            {added ? 'Добавлено' : 'В корзину'}
          </Button>
          <Link className="btn btn--secondary" to={`/tovar/${product.slug}`}>
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
