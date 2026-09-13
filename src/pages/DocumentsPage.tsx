import { useMemo, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { Seo } from '../components/Seo';
import { documents } from '../data/documents';
import { products } from '../data/products';
import type { DocumentType } from '../types';

export function DocumentsPage() {
  const [product, setProduct] = useState('all');
  const [type, setType] = useState<DocumentType | 'all'>('all');

  const list = useMemo(
    () =>
      documents.filter((item) => {
        const byProduct = product === 'all' || item.productSlug === product;
        const byType = type === 'all' || item.type === type;
        return byProduct && byType;
      }),
    [product, type],
  );

  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo
        title="Документы и испытания"
        description="Декларации, протоколы и паспорта изделий АКВАСОТА. На этапе прототипа показаны только заглушки."
        path="/dokumenty"
        noindex
      />
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Документы и испытания' }]} />
      <div className="page-title stack">
        <h1>Документы и испытания</h1>
        <p className="lead">Материалы готовятся к публикации. Номера, даты, лаборатории и результаты не выдумываем.</p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '24px 0' }}>
        <label className="field">
          <span>Товар</span>
          <select value={product} onChange={(event) => setProduct(event.target.value)}>
            <option value="all">Все товары</option>
            {products.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Тип</span>
          <select value={type} onChange={(event) => setType(event.target.value as DocumentType | 'all')}>
            <option value="all">Все типы</option>
            <option value="declaration">Декларации</option>
            <option value="protocol">Протоколы</option>
            <option value="passport">Паспорта</option>
          </select>
        </label>
      </div>
      <div className="cards-3">
        {list.map((item) => (
          <article className="doc-card" key={item.id}>
            <span className="badge badge--wait">Материалы готовятся к публикации</span>
            <h2 style={{ fontSize: 22 }}>{item.title}</h2>
            <p>{item.productName}</p>
            <p className="muted">Номер: {item.number}</p>
            <p className="muted">Дата: {item.date}</p>
            <p className="muted">Срок действия: {item.validUntil}</p>
            <p className="muted">Организация: {item.issuer}</p>
            <Button variant="secondary" disabled>
              Просмотр
            </Button>
            <Button disabled>Скачать</Button>
          </article>
        ))}
      </div>
    </div>
  );
}
