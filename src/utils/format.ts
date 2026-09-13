export function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

export function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, '');
  let rest = digits;

  if (rest.startsWith('8')) {
    rest = `7${rest.slice(1)}`;
  }
  if (!rest.startsWith('7')) {
    rest = `7${rest}`;
  }

  rest = rest.slice(0, 11);

  const parts = ['+7'];
  if (rest.length > 1) {
    parts.push(` (${rest.slice(1, 4)}`);
  }
  if (rest.length >= 4) {
    parts[1] += ')';
  }
  if (rest.length > 4) {
    parts.push(` ${rest.slice(4, 7)}`);
  }
  if (rest.length > 7) {
    parts.push(`-${rest.slice(7, 9)}`);
  }
  if (rest.length > 9) {
    parts.push(`-${rest.slice(9, 11)}`);
  }

  return parts.join('');
}

export function isValidPhone(value: string) {
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidName(value: string) {
  return value.trim().length >= 2;
}
