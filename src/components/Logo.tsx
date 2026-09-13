export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="logo" style={light ? { color: '#fff' } : undefined}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? '#36A9C5' : '#123B52'} />
        <path d="M16 6c5 8 9 13 9 18a9 9 0 1 1-18 0c0-5 4-10 9-18z" fill={light ? '#F4F8F9' : '#36A9C5'} />
      </svg>
      АКВАСОТА
    </span>
  );
}
