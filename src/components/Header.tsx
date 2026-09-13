import { Menu, Phone, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { companyInfo } from '../data/company';
import { navigation } from '../data/navigation';
import { Logo } from './Logo';

export function Header() {
  const { count } = useCart();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className={`header ${compact ? 'is-compact' : ''}`}>
      <div className="container header__inner">
        <Link to="/" aria-label="АКВАСОТА — на главную">
          <Logo />
        </Link>
        <nav className="nav" aria-label="Основная навигация">
          {navigation.map((item) =>
            item.to.includes('#') ? (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="header__actions">
          <a className="header__phone" href={companyInfo.phoneHref}>
            <Phone size={18} />
            <span>{companyInfo.phone}</span>
          </a>
          <Link className="cart-link" to="/korzina" aria-label={`Корзина, товаров: ${count}`}>
            <ShoppingCart size={22} />
            {count > 0 ? <span className="cart-link__count">{count}</span> : null}
          </Link>
          <button className="icon-btn menu-toggle" type="button" aria-label="Открыть меню" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>
      {open ? (
        <div className="overlay" onClick={() => setOpen(false)} role="presentation">
          <div className="drawer" onClick={(event) => event.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Logo />
              <button className="icon-btn" type="button" aria-label="Закрыть меню" onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <nav className="stack" aria-label="Мобильное меню">
              {navigation.map((item) => (
                <Link key={item.to} to={item.to} style={{ minHeight: 48, display: 'flex', alignItems: 'center', fontWeight: 700 }}>
                  {item.label}
                </Link>
              ))}
              <a href={companyInfo.phoneHref} style={{ minHeight: 48, display: 'flex', alignItems: 'center', fontWeight: 700 }}>
                {companyInfo.phone}
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
