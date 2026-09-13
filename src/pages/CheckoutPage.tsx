import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { companyInfo } from '../data/company';
import type { CheckoutFormValues } from '../types';
import { formatPhoneInput, formatPrice, isValidEmail, isValidName, isValidPhone } from '../utils/format';

const initial: CheckoutFormValues = {
  name: '',
  phone: '+7',
  email: '',
  city: '',
  receiveMethod: 'cdek',
  address: '',
  paymentMethod: 'card',
  comment: '',
  consent: false,
};

export function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof CheckoutFormValues>(key: K, value: CheckoutFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!isValidName(values.name)) next.name = 'Укажите имя.';
    if (!isValidPhone(values.phone)) next.phone = 'Введите телефон полностью.';
    if (!isValidEmail(values.email)) next.email = 'Укажите корректный e-mail.';
    if (!values.city.trim()) next.city = 'Укажите город.';
    if (values.receiveMethod === 'cdek' && values.address.trim().length < 4) {
      next.address = 'Укажите адрес или пункт выдачи СДЭК.';
    }
    if (!values.consent) next.consent = 'Нужно согласие на обработку данных.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (lines.length === 0) {
      return;
    }
    if (!validate()) {
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clear();
    }, 800);
  }

  if (success) {
    return (
      <div className="container" style={{ paddingBottom: 80 }}>
        <Seo title="Заказ сформирован" description="Демонстрационное оформление заказа АКВАСОТА." path="/oformlenie-zakaza" noindex />
        <div className="page-title stack">
          <h1>Заказ</h1>
          <div className="success-box">Заказ сформирован. На этапе прототипа данные не передаются продавцу.</div>
          <Link className="btn btn--primary" to="/">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Seo title="Оформление заказа" description="Оформление заказа фильтров АКВАСОТА. Прототип без оплаты." path="/oformlenie-zakaza" noindex />
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Корзина', to: '/korzina' },
          { label: 'Оформление заказа' },
        ]}
      />
      <div className="page-title">
        <h1>Оформление заказа</h1>
      </div>
      {lines.length === 0 ? (
        <div className="empty-note" style={{ marginTop: 24 }}>
          Добавьте товары в корзину, чтобы оформить заказ. <Link to="/katalog">Каталог</Link>
        </div>
      ) : (
        <div className="two-col" style={{ marginTop: 28 }}>
          <form className="form info-card" onSubmit={onSubmit} noValidate>
            <Field label="Имя" error={errors.name}>
              <input value={values.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" />
            </Field>
            <Field label="Телефон" error={errors.phone}>
              <input
                value={values.phone}
                onChange={(event) => update('phone', formatPhoneInput(event.target.value))}
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>
            <Field label="E-mail" error={errors.email}>
              <input value={values.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" />
            </Field>
            <Field label="Город" error={errors.city}>
              <input value={values.city} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2" />
            </Field>
            <Field label="Способ получения">
              <select
                value={values.receiveMethod}
                onChange={(event) => update('receiveMethod', event.target.value as CheckoutFormValues['receiveMethod'])}
              >
                <option value="cdek">СДЭК: пункт выдачи или адрес</option>
                <option value="pickup">Самовывоз в Королёве</option>
              </select>
            </Field>
            <Field
              label={values.receiveMethod === 'pickup' ? 'Адрес самовывоза' : 'Адрес или пункт выдачи'}
              error={errors.address}
            >
              <input
                value={values.receiveMethod === 'pickup' ? companyInfo.address : values.address}
                onChange={(event) => update('address', event.target.value)}
                readOnly={values.receiveMethod === 'pickup'}
              />
            </Field>
            <Field label="Способ оплаты">
              <select
                value={values.paymentMethod}
                onChange={(event) => update('paymentMethod', event.target.value as CheckoutFormValues['paymentMethod'])}
              >
                <option value="card">Картой при получении</option>
                <option value="cash">Наличными при получении</option>
                <option value="invoice">Счёт для юридических лиц</option>
              </select>
            </Field>
            <Field label="Комментарий">
              <textarea value={values.comment} onChange={(event) => update('comment', event.target.value)} />
            </Field>
            <label className="check">
              <input type="checkbox" checked={values.consent} onChange={(event) => update('consent', event.target.checked)} />
              <span>
                Согласен на обработку персональных данных. Текст:{' '}
                <Link to="/politika-konfidencialnosti">политика</Link>.
              </span>
            </label>
            {errors.consent ? <span className="error">{errors.consent}</span> : null}
            <Button type="submit" loading={loading}>
              Подтвердить заказ
            </Button>
            <p className="muted">Оплата в прототипе не проводится.</p>
          </form>
          <aside className="summary">
            <h2 style={{ fontSize: 24 }}>Состав заказа</h2>
            {lines.map((line) => (
              <p key={line.product.slug}>
                {line.product.name} × {line.quantity} — {formatPrice(line.sum)}
              </p>
            ))}
            <p className="price">{formatPrice(total)}</p>
            <p className="muted">Срок и стоимость доставки {companyInfo.deliveryCostNote.toLowerCase()}.</p>
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <span>{label}</span>
      {children}
      {error ? <span className="error">{error}</span> : null}
    </label>
  );
}
