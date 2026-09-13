import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MediaImg } from '../components/MediaImg';
import { Seo } from '../components/Seo';
import { companyInfo } from '../data/company';
import { images } from '../data/images';

export function AboutPage() {
  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo
        title="О компании"
        description="ООО «АКВАПЛЮС» производит фильтры АКВАСОТА в России. Подход к качеству, производству и документам."
        path="/o-kompanii"
      />
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'О компании' }]} />
      <div className="page-title stack">
        <h1>О компании</h1>
        <p className="lead">Фильтры АКВАСОТА производит {companyInfo.legalName}, {companyInfo.country}.</p>
      </div>
      <div className="stack-lg" style={{ marginTop: 32 }}>
        <section className="two-col">
          <div className="stack">
            <h2>Кто производит фильтры</h2>
            <p>
              Бренд АКВАСОТА принадлежит производителю {companyInfo.legalName}. Сайт — витрина производителя, без посредника в цепочке заказа.
            </p>
            <p className="muted">Историю компании, даты основания и объёмы выпуска не публикуем без подтверждения.</p>
          </div>
          <MediaImg src={images.production} alt="Нейтральный производственный интерьер лаборатории" />
        </section>
        <section className="info-card">
          <h2>Подход к качеству</h2>
          <p>Каждая модель сопровождается инструкцией по запуску, промывке и хранению. Точные показатели очистки появятся вместе с действующими протоколами.</p>
        </section>
        <section className="two-col">
          <MediaImg src={images.control} alt="Контроль качества в светлом лабораторном пространстве" />
          <div className="stack">
            <h2>Производство и контроль</h2>
            <p>Переносные фильтры собираются с трековой мембраной АС-ТМ. В Аквасота-2 добавлена сорбционная мембрана АС-СМ.</p>
            <p className="muted">Фотографии собственного производства заменят временные кадры после утверждения стиля.</p>
          </div>
        </section>
        <section className="info-card">
          <h2>Документы</h2>
          <p>Декларации, протоколы и паспорта будут доступны в отдельном разделе. Сейчас там стоят заглушки без фиктивных номеров.</p>
          <Link to="/dokumenty">Открыть документы</Link>
        </section>
        <section className="info-card">
          <h2>Контакты</h2>
          <p>{companyInfo.legalName}</p>
          <p>{companyInfo.address}</p>
          <p>
            <a href={companyInfo.phoneHref}>{companyInfo.phone}</a>
          </p>
          <p>
            <a href={companyInfo.emailHref}>{companyInfo.email}</a>
          </p>
        </section>
      </div>
    </div>
  );
}
