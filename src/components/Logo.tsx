/** Логотип: соты + капля (по макету заказчика). */
export function Logo({ light = false }: { light?: boolean }) {
  const ink = light ? '#E8F4F8' : '#1B4F9C';
  const fill = light ? '#9FD0E8' : '#0E3A7A';

  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="logo__mark">
        {/* Honeycomb cells */}
        <path
          d="M12.5 4.5 L18.5 8 V15 L12.5 18.5 L6.5 15 V8 Z"
          fill="none"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M20.5 4.5 L26.5 8 V15 L20.5 18.5 L14.5 15 V8 Z"
          fill="none"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 15.5 L22.5 19 V26 L16.5 29.5 L10.5 26 V19 Z"
          fill="none"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M24.5 15.5 L30.5 19 V26 L24.5 29.5 L18.5 26 V19 Z"
          fill="none"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M28.5 4.5 L34.5 8 V15 L28.5 18.5 L22.5 15 V8 Z"
          fill="none"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Water drop */}
        <path
          d="M23.2 12.2c2.2 3.4 3.8 5.4 3.8 7.4a3.8 3.8 0 1 1-7.6 0c0-2 1.6-4 3.8-7.4z"
          fill={fill}
          stroke={ink}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M19.8 20.2h6.4" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">АКВАСОТА</span>
        <span className="logo__tag">фильтры для воды</span>
      </span>
    </span>
  );
}
