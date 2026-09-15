import { Link } from 'react-router-dom';
import { companyInfo } from '../data/company';
import { categories } from '../data/categories';
import { footerNav } from '../data/navigation';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand stack">
          <Logo light />
          <p>{companyInfo.shortDescription}</p>
        </div>
        <div>
          <h3>Каталог</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={`/katalog/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Разделы</h3>
          <ul>
            {footerNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Контакты</h3>
          <ul>
            <li>
              <a href={companyInfo.phoneHref}>{companyInfo.phone}</a>
            </li>
            <li>
              <a href={companyInfo.emailHref}>{companyInfo.email}</a>
            </li>
            <li>{companyInfo.address}</li>
            <li>
              {companyInfo.workdays}. {companyInfo.weekends}.
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>{companyInfo.copyright}</span>
        <span>{companyInfo.offerDisclaimer}</span>
      </div>
    </footer>
  );
}
