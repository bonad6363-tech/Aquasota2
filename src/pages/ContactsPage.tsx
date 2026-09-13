import { Mail, Phone } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConsultForm } from '../components/ConsultForm';
import { organizationJsonLd, Seo } from '../components/Seo';
import { companyInfo } from '../data/company';

export function ContactsPage() {
  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo
        title="Контакты"
        description={`Телефон ${companyInfo.phone}, ${companyInfo.address}. ${companyInfo.workdays}.`}
        path="/kontakty"
        jsonLd={organizationJsonLd()}
      />
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Контакты' }]} />
      <div className="page-title stack">
        <h1>Контакты</h1>
        <p className="lead">{companyInfo.legalName}</p>
      </div>
      <div className="contact-grid" style={{ marginTop: 28 }}>
        <div className="stack-lg">
          <article className="info-card">
            <p>
              <strong>Адрес:</strong> {companyInfo.address}
            </p>
            <p>
              <strong>Телефон:</strong> <a href={companyInfo.phoneHref}>{companyInfo.phone}</a>
            </p>
            <p>
              <strong>E-mail:</strong> <a href={companyInfo.emailHref}>{companyInfo.email}</a>
            </p>
            <p>
              <strong>Режим:</strong> {companyInfo.workdays}
            </p>
            <p>
              <strong>Выходные:</strong> суббота и воскресенье
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn btn--primary" href={companyInfo.phoneHref}>
                <Phone size={18} /> Позвонить
              </a>
              <a className="btn btn--secondary" href={companyInfo.emailHref}>
                <Mail size={18} /> Написать
              </a>
            </div>
          </article>
          <div className="map-placeholder">
            Карта будет добавлена после подтверждения координат.
            <br />
            Неточные координаты не указываем.
          </div>
        </div>
        <div className="info-card">
          <h2 style={{ fontSize: 24 }}>Задать вопрос</h2>
          <ConsultForm />
        </div>
      </div>
    </div>
  );
}
