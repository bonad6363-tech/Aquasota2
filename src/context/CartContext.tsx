import { createContext, createElement, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { getProduct } from '../data/products';
import type { CartItem, Product } from '../types';

const STORAGE_KEY = 'aquasota-cart';

interface CartState {
  items: CartItem[];
}

interface CartContextValue {
  items: CartItem[];
  lines: { product: Product; quantity: number; sum: number }[];
  count: number;
  total: number;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

let memoryState: CartState = { items: [] };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readStorage(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { items: [] };
    }
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.items)) {
      return { items: [] };
    }
    return {
      items: parsed.items.filter((item) => item.slug && item.quantity > 0),
    };
  } catch {
    return { items: [] };
  }
}

function writeStorage(state: CartState) {
  memoryState = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return memoryState;
}

if (typeof window !== 'undefined') {
  memoryState = readStorage();
  window.addEventListener('storage', () => {
    memoryState = readStorage();
    emit();
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const add = useCallback((slug: string, quantity = 1) => {
    const current = readStorage();
    const existing = current.items.find((item) => item.slug === slug);
    const nextItems = existing
      ? current.items.map((item) =>
          item.slug === slug ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item,
        )
      : [...current.items, { slug, quantity: Math.min(99, quantity) }];
    writeStorage({ items: nextItems });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const next = Math.max(1, Math.min(99, quantity));
    const current = readStorage();
    writeStorage({
      items: current.items.map((item) => (item.slug === slug ? { ...item, quantity: next } : item)),
    });
  }, []);

  const remove = useCallback((slug: string) => {
    const current = readStorage();
    writeStorage({ items: current.items.filter((item) => item.slug !== slug) });
  }, []);

  const clear = useCallback(() => {
    writeStorage({ items: [] });
  }, []);

  const value = useMemo(() => {
    const lines = state.items
      .map((item) => {
        const product = getProduct(item.slug);
        if (!product) {
          return null;
        }
        return {
          product,
          quantity: item.quantity,
          sum: product.price * item.quantity,
        };
      })
      .filter((line) => line !== null);

    return {
      items: state.items,
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      total: lines.reduce((sum, line) => sum + line.sum, 0),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [state, add, setQuantity, remove, clear]);

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
