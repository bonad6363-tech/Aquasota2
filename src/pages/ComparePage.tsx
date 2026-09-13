import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Seo } from '../components/Seo';
import { getComparableProducts } from '../data/products';
import { formatPrice } from '../utils/format';

const rows = [
  { label: 'Назначение', key: 'purpose' },
  { label: 'Тип установки', key: 'installType' },
  { label: 'Производительность', key: 'performance' },
  { label: 'Допустимая температура воды', key: 'waterTemp' },
  { label: 'Срок службы', key: 'lifetime' },
  { label: 'Размеры', key: 'size' },
  { label: 'Особенности ухода', key: 'careSummary' },
] as const;

export function ComparePage() {
  const items = getComparableProducts();

  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo
        title="Сравнение моделей"
        description="Сравнение переносных фильтров Аквасота-1 и Аквасота-2 по подтверждённым характеристикам."
        path="/sravnenie"
      />
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Сравнение моделей' }]} />
      <div className="page-title stack">
        <h1>Сравнение моделей</h1>
        <p className="lead">Только подтверждённые параметры. Если данных нет, стоит пометка «Уточняется».</p>
      </div>
      <div className="table-wrap desktop-only" style={{ marginTop: 28 }}>
        <table>
          <thead>
            <tr>
              <th>Параметр</th>
              {items.map((item) => (
                <th key={item.slug}>
                  <Link to={`/tovar/${item.slug}`}>{item.name}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                {items.map((item) => (
                  <td key={item.slug}>{item[row.key]}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Комплектация</td>
              {items.map((item) => (
                <td key={item.slug}>{item.kit.slice(0, 3).join('; ')}</td>
              ))}
            </tr>
            <tr>
              <td>Цена</td>
              {items.map((item) => (
                <td key={item.slug}>{formatPrice(item.price)}</td>
              ))}
            </tr>
            <tr>
              <td>Наличие</td>
              {items.map((item) => (
                <td key={item.slug}>{item.inStock ? 'В наличии' : 'Нет в наличии'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="compare-cards" style={{ marginTop: 24 }}>
        {items.map((item) => (
          <article className="info-card" key={item.slug}>
            <h2 style={{ fontSize: 24 }}>{item.name}</h2>
            {rows.map((row) => (
              <p key={row.key}>
                <strong>{row.label}:</strong> {item[row.key]}
              </p>
            ))}
            <p>
              <strong>Цена:</strong> {formatPrice(item.price)}
            </p>
            <Link className="btn btn--primary" to={`/tovar/${item.slug}`}>
              Открыть карточку
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
