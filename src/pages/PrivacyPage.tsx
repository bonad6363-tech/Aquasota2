import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Seo } from '../components/Seo';
import { companyInfo } from '../data/company';

export function PrivacyPage() {
  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo
        title="Политика обработки персональных данных"
        description="Прототип политики обработки персональных данных АКВАСОТА. Итоговый текст предоставит заказчик."
        path="/politika-konfidencialnosti"
        noindex
      />
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Политика обработки данных' }]} />
      <div className="page-title stack">
        <h1>Политика обработки персональных данных</h1>
        <p className="lead">Итоговый юридический текст будет опубликован после получения документа от заказчика.</p>
      </div>
      <div className="prose" style={{ marginTop: 28 }}>
        <p>
          На этапе прототипа формы собирают имя, телефон, e-mail и комментарий только в интерфейсе. Данные не передаются на сервер и не сохраняются у продавца.
        </p>
        <p>
          Оператор: {companyInfo.legalName}. Контакты: {companyInfo.address}, {companyInfo.phone}, {companyInfo.email}.
        </p>
        <p>
          После утверждения дизайна сюда будет подставлен согласованный текст политики. До этого момента формулировки этой страницы нельзя считать действующей офертой или утверждённым регламентом.
        </p>
        <p>
          <Link to="/kontakty">Связаться с производителем</Link>
        </p>
      </div>
    </div>
  );
}
