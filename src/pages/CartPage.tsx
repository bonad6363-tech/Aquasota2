import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaImg } from '../components/MediaImg';
import { Quantity } from '../components/Quantity';
import { Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export function CartPage() {
  const { lines, total, setQuantity, remove } = useCart();

  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo title="Корзина" description="Корзина интернет-магазина АКВАСОТА." path="/korzina" noindex />
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]} />
      <div className="page-title">
        <h1>Корзина</h1>
      </div>
      {lines.length === 0 ? (
        <div className="empty-note" style={{ marginTop: 24 }}>
          Корзина пуста. <Link to="/katalog">Перейти в каталог</Link>
        </div>
      ) : (
        <div className="two-col" style={{ marginTop: 28 }}>
          <div className="cart-list">
            {lines.map((line) => (
              <article className="cart-row" key={line.product.slug}>
                <MediaImg src={line.product.images[0].src} alt={line.product.images[0].alt} />
                <div>
                  <Link to={`/tovar/${line.product.slug}`}>
                    <strong>{line.product.name}</strong>
                  </Link>
                  <p className="muted">{formatPrice(line.product.price)}</p>
                </div>
                <Quantity value={line.quantity} onChange={(value) => setQuantity(line.product.slug, value)} />
                <strong>{formatPrice(line.sum)}</strong>
                <button className="btn btn--ghost" type="button" onClick={() => remove(line.product.slug)}>
                  Удалить
                </button>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2 style={{ fontSize: 24 }}>Итого</h2>
            <p className="price">{formatPrice(total)}</p>
            <p className="muted">Доставка рассчитывается при оформлении заказа.</p>
            <Link className="btn btn--primary" to="/oformlenie-zakaza">
              Оформить заказ
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
