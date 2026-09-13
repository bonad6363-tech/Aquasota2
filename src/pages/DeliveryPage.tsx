import { Breadcrumbs } from '../components/Breadcrumbs';
import { Seo } from '../components/Seo';
import { companyInfo } from '../data/company';

export function DeliveryPage() {
  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo
        title="Доставка и оплата"
        description="Доставка фильтров АКВАСОТА по России через СДЭК, самовывоз в Королёве и оплата при получении."
        path="/dostavka-i-oplata"
      />
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Доставка и оплата' }]} />
      <div className="page-title stack">
        <h1>Доставка и оплата</h1>
      </div>
      <div className="cards-3" style={{ marginTop: 28 }}>
        <article className="info-card">
          <h2>Доставка</h2>
          <p>{companyInfo.deliveryFull}</p>
        </article>
        <article className="info-card">
          <h2>Самовывоз</h2>
          <p>{companyInfo.pickup}</p>
        </article>
        <article className="info-card">
          <h2>Режим работы</h2>
          <p>
            {companyInfo.workdays}. {companyInfo.weekends}.
          </p>
        </article>
        <article className="info-card">
          <h2>Оплата</h2>
          <p>{companyInfo.payment}</p>
        </article>
        <article className="info-card">
          <h2>Срок и стоимость</h2>
          <p>{companyInfo.deliveryCostNote}.</p>
        </article>
      </div>
    </div>
  );
}
