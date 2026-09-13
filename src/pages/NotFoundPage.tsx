import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <Seo title="Страница не найдена" description="Запрошенная страница не существует." path="/404" noindex />
      <div className="stack" style={{ maxWidth: 640 }}>
        <p className="eyebrow">404</p>
        <h1>Такой страницы нет</h1>
        <p className="lead">Проверьте адрес или вернитесь в каталог фильтров.</p>
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/">
            На главную
          </Link>
          <Link className="btn btn--secondary" to="/katalog">
            В каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
