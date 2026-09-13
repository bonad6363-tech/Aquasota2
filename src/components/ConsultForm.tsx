import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { formatPhoneInput, isValidName, isValidPhone } from '../utils/format';
import { Button } from './Button';

interface ConsultFormProps {
  submitLabel?: string;
  successText?: string;
}

const defaultSuccess = 'Заявка принята. На этапе прототипа данные не отправляются.';

export function ConsultForm({
  submitLabel = 'Получить консультацию',
  successText = defaultSuccess,
}: ConsultFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!isValidName(name)) {
      next.name = 'Укажите имя — не меньше двух символов.';
    }
    if (!isValidPhone(phone)) {
      next.phone = 'Введите телефон в формате +7 (987) 878-52-99.';
    }
    if (!consent) {
      next.consent = 'Нужно согласие на обработку персональных данных.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName('');
      setPhone('+7');
      setComment('');
      setConsent(false);
    }, 700);
  }

  if (success) {
    return <div className="success-box">{successText}</div>;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label className={`field ${errors.name ? 'field--error' : ''}`}>
        <span>Имя</span>
        <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        {errors.name ? <span className="error">{errors.name}</span> : null}
      </label>
      <label className={`field ${errors.phone ? 'field--error' : ''}`}>
        <span>Телефон</span>
        <input
          value={phone}
          onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
          inputMode="tel"
          autoComplete="tel"
        />
        {errors.phone ? <span className="error">{errors.phone}</span> : null}
      </label>
      <label className="field">
        <span>Комментарий</span>
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
      </label>
      <label className="check">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>
          Согласен на обработку персональных данных. Подробнее в{' '}
          <Link to="/politika-konfidencialnosti">политике</Link>.
        </span>
      </label>
      {errors.consent ? <span className="error">{errors.consent}</span> : null}
      <Button type="submit" loading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}
