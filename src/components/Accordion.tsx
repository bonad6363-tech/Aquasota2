import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { FaqItem } from '../types';

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`${baseId}-${index}`}
              onClick={() => setOpen(expanded ? null : index)}
            >
              {item.question}
              <ChevronDown size={18} style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
            </button>
            {expanded ? (
              <div className="accordion__panel" id={`${baseId}-${index}`}>
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
