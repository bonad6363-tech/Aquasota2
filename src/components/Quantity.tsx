interface QuantityProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Quantity({ value, onChange, min = 1, max = 99 }: QuantityProps) {
  return (
    <div className="qty">
      <button type="button" aria-label="Уменьшить количество" onClick={() => onChange(Math.max(min, value - 1))}>
        −
      </button>
      <input
        aria-label="Количество"
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value.replace(/\D/g, '')) || min;
          onChange(Math.min(max, Math.max(min, next)));
        }}
      />
      <button type="button" aria-label="Увеличить количество" onClick={() => onChange(Math.min(max, value + 1))}>
        +
      </button>
    </div>
  );
}
