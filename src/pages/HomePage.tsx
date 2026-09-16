import { ArrowRight, Droplets, Factory, FileCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import { Button } from '../components/Button';
import { ConsultForm } from '../components/ConsultForm';
import { MediaImg } from '../components/MediaImg';
import { ProductCard } from '../components/ProductCard';
import { organizationJsonLd, Seo } from '../components/Seo';
import { companyInfo } from '../data/company';
import { categories } from '../data/categories';
import { faqItems } from '../data/faq';
import { images } from '../data/images';
import { getComparableProducts, getPopularProducts } from '../data/products';
import { formatPrice } from '../utils/format';
import { getQuizResult, type QuizAnswers, type QuizPeople, type QuizPlace, type QuizType } from '../utils/quiz';

export function HomePage() {
  const popular = getPopularProducts();
  const comparable = getComparableProducts();

  return (
    <>
      <Seo
        title="АКВАСОТА — фильтры для воды"
        description={companyInfo.subtitle}
        path="/"
        jsonLd={organizationJsonLd()}
      />
      <section className="hero hero--banner">
        <div className="hero__atmosphere" aria-hidden="true">
          <MediaImg className="hero__atmosphere-img" src={images.heroShowcase} alt="" />
        </div>
        <div className="container hero__layout">
          <div className="hero__copy">
            <p className="eyebrow">Российское производство · доставка по России</p>
            <h1>{companyInfo.tagline}</h1>
            <p>{companyInfo.subtitle}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/#podbor">
                Подобрать фильтр
              </Link>
              <Link className="btn btn--secondary hero__secondary" to="/katalog">
                Смотреть каталог
              </Link>
            </div>
            <div className="hero__notes" aria-label="Ключевые преимущества">
              <span>Без электричества</span>
              <span>Компактный формат</span>
              <span>Помощь в подборе</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--collections">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Каталог</p>
              <h2>Выберите решение для чистой воды</h2>
            </div>
            <Link className="text-link" to="/katalog">
              Смотреть всё <ArrowRight size={18} />
            </Link>
          </div>
          <div className="collection-grid">
            {categories.map((category) => (
              <Link
                className={`collection-card collection-card--${category.slug}`}
                key={category.slug}
                to={`/katalog/${category.slug}`}
              >
                <MediaImg src={category.image} alt={category.imageAlt} />
                <div className="collection-card__shade" />
                <div className="collection-card__copy">
                  <h3>{category.shortName}</h3>
                  <span>Перейти в раздел <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section popular-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Выбор покупателей</p>
              <h2>Популярные товары</h2>
            </div>
            <Link className="btn btn--secondary" to="/katalog">
              Весь каталог
            </Link>
          </div>
          <div className="cards-4">
            {popular.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="perks perks--feature-strip">
          <article className="perk">
            <Factory size={22} color="#123B52" />
            <div>
              <strong>Российское производство</strong>
              <span>Фильтры выпускает {companyInfo.legalName}.</span>
            </div>
          </article>
          <article className="perk">
            <Truck size={22} color="#123B52" />
            <div>
              <strong>Доставка по России</strong>
              <span>{companyInfo.deliveryShort}.</span>
            </div>
          </article>
          <article className="perk">
            <FileCheck size={22} color="#123B52" />
            <div>
              <strong>Документы в открытом доступе</strong>
              <span>Декларации и протоколы публикуются по мере готовности.</span>
            </div>
          </article>
        </div>
      </div>

      <section className="section scenario-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Сценарии</p>
              <h2>Где используют фильтры</h2>
            </div>
          </div>
          <div className="cards-3">
            <ScenarioCard
              title="Для дома"
              text="Переносной фильтр рядом с кухонной ёмкостью, если нет стационарной системы."
              src={images.scenarioHome}
              alt="Кухонный кран с чистой водой — сценарий использования фильтра дома"
              to="/katalog/perenosnye-filtry"
            />
            <ScenarioCard
              title="Для дачи"
              text="Очистка воды без электричества, когда источник воды не городской водопровод."
              src={images.scenarioDacha}
              alt="Загородный дом с садом — сценарий использования фильтра на даче"
              to="/katalog/perenosnye-filtry"
            />
            <ScenarioCard
              title="Для путешествий"
              text="Компактный формат для поездок, походов и временного жилья."
              src={images.scenarioTravel}
              alt="Кемпинг у озера — сценарий использования фильтра в путешествии"
              to="/katalog/perenosnye-filtry"
            />
          </div>
        </div>
      </section>

      <section className="section" id="podbor" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Подбор</p>
              <h2>Подберите фильтр за три шага</h2>
            </div>
          </div>
          <Quiz />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container stack-lg">
          <div className="section-head">
            <div>
              <p className="eyebrow">Сравнение</p>
              <h2>Аквасота-1 и Аквасота-2</h2>
            </div>
            <Link className="btn btn--secondary" to="/sravnenie">
              Полное сравнение
            </Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Параметр</th>
                  {comparable.map((item) => (
                    <th key={item.slug}>{item.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Размер</td>
                  {comparable.map((item) => (
                    <td key={item.slug}>{item.size}</td>
                  ))}
                </tr>
                <tr>
                  <td>Производительность</td>
                  {comparable.map((item) => (
                    <td key={item.slug}>{item.performance}</td>
                  ))}
                </tr>
                <tr>
                  <td>Мембраны</td>
                  <td>АС-ТМ 0,4 мкм</td>
                  <td>АС-ТМ 0,4 мкм и АС-СМ</td>
                </tr>
                <tr>
                  <td>Цена</td>
                  {comparable.map((item) => (
                    <td key={item.slug}>{formatPrice(item.price)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Принцип работы</p>
              <h2>Как работает фильтр</h2>
            </div>
          </div>
          <div className="steps">
            <article className="step">
              <div className="step__num">1</div>
              <h3>Вода поступает в фильтр</h3>
              <p className="muted">Фильтр погружают в ёмкость с исходной водой и запускают отвод по трубке.</p>
            </article>
            <article className="step">
              <div className="step__num">2</div>
              <h3>Фильтрующие слои задерживают загрязнения</h3>
              <p className="muted">Трековая мембрана и, в модели Аквасота-2, сорбционная мембрана работают последовательно.</p>
            </article>
            <article className="step">
              <div className="step__num">3</div>
              <h3>Очищенная вода поступает в ёмкость</h3>
              <p className="muted">Нормальный режим — капельный. Перепад высоты между ёмкостями — от 0,2 до 1,0 м.</p>
            </article>
          </div>
          <div className="how-it-works__gallery">
            <figure className="media-card how-it-works__diagram">
              <MediaImg
                className="media-card__img"
                src={images.aquasotaHowItWorks}
                alt="Схема работы фильтра АКВАСОТА: ёмкость с исходной водой выше ёмкости с очищенной, перепад 0,2–1,0 м"
              />
              <figcaption className="media-card__body">
                <h3>Схема подключения</h3>
              </figcaption>
            </figure>
            <figure className="media-card how-it-works__diagram">
              <MediaImg
                className="media-card__img"
                src={images.aquasota2Kit}
                alt="Комплектация Аквасота-1 и Аквасота-2: фильтр, трубка 1,5 м, сумка"
              />
              <figcaption className="media-card__body">
                <h3>Комплектация Аквасота-1 и Аквасота-2</h3>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Документы</p>
              <h2>Документы и испытания</h2>
            </div>
            <Link className="btn btn--secondary" to="/dokumenty">
              Все документы
            </Link>
          </div>
          <div className="cards-3">
            {['Декларация о соответствии', 'Протокол испытаний', 'Паспорт изделия'].map((title) => (
              <article className="info-card" key={title}>
                <FileCheck size={22} color="#123B52" />
                <h3>{title}</h3>
                <p className="muted">Материалы готовятся к публикации.</p>
                <span className="badge badge--wait">Скоро</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container stack-lg">
          <div>
            <p className="eyebrow">Отзывы</p>
            <h2>Что говорят покупатели</h2>
          </div>
          <div className="reviews-empty">Здесь появятся отзывы покупателей.</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Логистика</p>
              <h2>Доставка и оплата</h2>
            </div>
            <Link className="btn btn--secondary" to="/dostavka-i-oplata">
              Подробнее
            </Link>
          </div>
          <div className="cards-4">
            <article className="info-card">
              <h3>СДЭК</h3>
              <p className="muted">Доставка по России через транспортную компанию СДЭК.</p>
            </article>
            <article className="info-card">
              <h3>Самовывоз</h3>
              <p className="muted">После оформления заказа по адресу {companyInfo.address}.</p>
            </article>
            <article className="info-card">
              <h3>Оплата при получении</h3>
              <p className="muted">Наличными или картой.</p>
            </article>
            <article className="info-card">
              <h3>Для юрлиц</h3>
              <p className="muted">Безналичная оплата по счёту.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="faq" style={{ background: 'var(--white)' }}>
        <div className="container stack-lg">
          <div>
            <p className="eyebrow">Вопросы</p>
            <h2>Частые вопросы</h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      <section className="section" id="consult">
        <div className="container consult-block">
          <div className="consult-block__copy stack">
            <p className="eyebrow">Консультация</p>
            <h2>Поможем выбрать подходящий фильтр</h2>
            <p className="lead">Оставьте имя и телефон. Перезвоним в рабочие часы: {companyInfo.workdays}.</p>
            <div className="consult-block__about">
              <h3>Коротко о фильтрах АКВАСОТА</h3>
              <p className="muted">
                АКВАСОТА — линейка фильтров российского производителя ООО «АКВАПЛЮС». В каталоге — переносные модели
                Аквасота-1 и Аквасота-2, магистральные фильтры, аксессуары и сменные элементы. Доставка через СДЭК по
                России. Самовывоз — в Королёве, ул. Дурылина, 39А, после предварительного заказа.
              </p>
            </div>
          </div>
          <div className="info-card">
            <ConsultForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ScenarioCard({
  title,
  text,
  src,
  alt,
  to,
}: {
  title: string;
  text: string;
  src: string;
  alt: string;
  to: string;
}) {
  return (
    <article className="media-card">
      <MediaImg src={src} alt={alt} />
      <div className="media-card__body">
        <h3>{title}</h3>
        <p className="muted">{text}</p>
        <Link to={to}>Смотреть товары →</Link>
      </div>
    </article>
  );
}

function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({ place: null, people: null, type: null });
  const result = step > 3 ? getQuizResult(answers) : null;

  return (
    <div className="quiz">
      <div className="quiz__steps" aria-hidden="true">
        <span className={`quiz__step ${step >= 1 ? 'is-active' : ''}`} />
        <span className={`quiz__step ${step >= 2 ? 'is-active' : ''}`} />
        <span className={`quiz__step ${step >= 3 ? 'is-active' : ''}`} />
      </div>
      {step === 1 ? (
        <QuizBlock
          title="Где будет использоваться фильтр?"
          options={[
            { id: 'home', label: 'Дома' },
            { id: 'dacha', label: 'На даче' },
            { id: 'travel', label: 'В путешествии' },
          ]}
          value={answers.place}
          onSelect={(id) => {
            setAnswers((prev) => ({ ...prev, place: id as QuizPlace }));
            setStep(2);
          }}
        />
      ) : null}
      {step === 2 ? (
        <QuizBlock
          title="Сколько человек будут пользоваться водой?"
          options={[
            { id: '1-2', label: '1–2 человека' },
            { id: '3-4', label: '3–4 человека' },
            { id: '5+', label: '5 и больше' },
          ]}
          value={answers.people}
          onSelect={(id) => {
            setAnswers((prev) => ({ ...prev, people: id as QuizPeople }));
            setStep(3);
          }}
        />
      ) : null}
      {step === 3 ? (
        <QuizBlock
          title="Нужен переносной или стационарный вариант?"
          options={[
            { id: 'portable', label: 'Переносной' },
            { id: 'stationary', label: 'Стационарный' },
          ]}
          value={answers.type}
          onSelect={(id) => {
            setAnswers((prev) => ({ ...prev, type: id as QuizType }));
            setStep(4);
          }}
        />
      ) : null}
      {result ? (
        <div className="stack-lg">
          <p>{result.note}</p>
          <div className="cards-3">
            {result.products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              setStep(1);
              setAnswers({ place: null, people: null, type: null });
            }}
          >
            Пройти ещё раз
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function QuizBlock({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: { id: string; label: string }[];
  value: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="stack">
      <h3>{title}</h3>
      <div className="choice-grid">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`choice ${value === option.id ? 'is-active' : ''}`}
            onClick={() => onSelect(option.id)}
          >
            <Droplets size={18} />
            <div>{option.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
