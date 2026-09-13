import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { ConsultForm } from '../components/ConsultForm';
import { MediaImg } from '../components/MediaImg';
import { Modal } from '../components/Modal';
import { Quantity } from '../components/Quantity';
import { organizationJsonLd, Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';
import { companyInfo } from '../data/company';
import { getProduct } from '../data/products';
import { formatPrice } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';

const tabs = [
  { id: 'desc', label: 'Описание' },
  { id: 'specs', label: 'Характеристики' },
  { id: 'kit', label: 'Комплектация' },
  { id: 'usage', label: 'Инструкция' },
  { id: 'care', label: 'Уход и промывка' },
  { id: 'docs', label: 'Документы' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'faq', label: 'Вопросы и ответы' },
] as const;

export function ProductPage() {
  const { productSlug } = useParams();
  const product = productSlug ? getProduct(productSlug) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('desc');
  const [image, setImage] = useState(0);
  const [questionOpen, setQuestionOpen] = useState(false);

  if (!product) {
    return <NotFoundPage />;
  }

  const category = categories.find((item) => item.slug === product.category);

  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo
        title={product.name}
        description={product.shortPurpose}
        path={`/tovar/${product.slug}`}
        image={product.images[0].src}
        jsonLd={[
          organizationJsonLd(),
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            sku: product.sku,
            description: product.shortPurpose,
            image: `${companyInfo.siteUrl}${product.images[0].src}`,
            brand: companyInfo.brand,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'RUB',
              price: product.price,
              availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: `${companyInfo.siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${companyInfo.siteUrl}/katalog` },
              { '@type': 'ListItem', position: 3, name: product.name, item: `${companyInfo.siteUrl}/tovar/${product.slug}` },
            ],
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Каталог', to: '/katalog' },
          { label: category?.name ?? 'Категория', to: `/katalog/${product.category}` },
          { label: product.name },
        ]}
      />
      <section className="product-hero">
        <div>
          <MediaImg
            src={product.images[image].src}
            alt={product.images[image].alt}
            className="gallery__main"
            priority
          />
          <div className="thumbs">
            {product.images.map((item, index) => (
              <button
                key={item.src + index}
                type="button"
                className={index === image ? 'is-active' : ''}
                onClick={() => setImage(index)}
                aria-label={`Показать изображение ${index + 1}`}
              >
                <MediaImg src={item.src} alt={item.alt} />
              </button>
            ))}
          </div>
        </div>
        <div className="stack-lg">
          <div className="stack">
            <p className="eyebrow">{category?.name}</p>
            <h1>{product.name}</h1>
            <p className="muted">Артикул {product.sku}</p>
            <span className={product.inStock ? 'badge badge--ok' : 'badge badge--wait'}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
            <p>{product.shortPurpose}</p>
          </div>
          <ul>
            {product.specs.slice(0, 4).map((item) => (
              <li key={item.label}>
                {item.label}: {item.value}
              </li>
            ))}
          </ul>
          <div className="price-row">
            <span className="price">{product.priceOnRequest ? 'Цена уточняется' : formatPrice(product.price)}</span>
            {product.oldPrice ? <span className="price--old">{formatPrice(product.oldPrice)}</span> : null}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Quantity value={qty} onChange={setQty} />
            <Button
              variant={added ? 'success' : 'primary'}
              disabled={!product.inStock || product.priceOnRequest}
              onClick={() => {
                add(product.slug, qty);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1600);
              }}
            >
              {added ? 'Добавлено' : 'В корзину'}
            </Button>
            <Button variant="secondary" onClick={() => setQuestionOpen(true)}>
              Задать вопрос
            </Button>
          </div>
          <div className="info-card">
            <p>{companyInfo.deliveryShort}.</p>
            <p className="muted">Самовывоз после заказа. {companyInfo.payment}</p>
            <p className="muted">Срок и стоимость доставки {companyInfo.deliveryCostNote.toLowerCase()}.</p>
          </div>
        </div>
      </section>

      <div className="tabs">
        {tabs.map((item) => (
          <button key={item.id} type="button" className={tab === item.id ? 'is-active' : ''} onClick={() => setTab(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'desc' ? (
        <div className="prose">
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {tab === 'specs' ? (
        <div className="table-wrap">
          <table>
            <tbody>
              {product.specs.map((spec) => (
                <tr key={spec.label}>
                  <th>{spec.label}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {tab === 'kit' ? (
        <ul className="prose">
          {product.kit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {tab === 'usage' ? (
        <div className="prose">
          {product.usage.map((item, index) => (
            <p key={item}>
              <strong>{index + 1}.</strong> {item}
            </p>
          ))}
        </div>
      ) : null}
      {tab === 'care' ? (
        <div className="prose">
          {product.care.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      ) : null}
      {tab === 'docs' ? (
        <div className="empty-note">
          Материалы готовятся к публикации. Неподтверждённые номера и результаты испытаний не показываем.
          <div style={{ marginTop: 12 }}>
            <Link to="/dokumenty">Перейти в раздел документов</Link>
          </div>
        </div>
      ) : null}
      {tab === 'delivery' ? (
        <div className="prose">
          <p>{companyInfo.deliveryFull}</p>
          <p>{companyInfo.pickup}</p>
          <p>{companyInfo.payment}</p>
        </div>
      ) : null}
      {tab === 'faq' ? <Accordion items={product.faq} /> : null}

      <Modal open={questionOpen} title="Задать вопрос" onClose={() => setQuestionOpen(false)}>
        <ConsultForm submitLabel="Отправить вопрос" />
      </Modal>
    </div>
  );
}
