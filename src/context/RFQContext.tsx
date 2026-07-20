"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface RFQItem {
  id: string;
  name: string;
  image: string;
  quantity: number; // containers
}

interface RFQContextType {
  items: RFQItem[];
  addItem: (item: Omit<RFQItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const RFQContext = createContext<RFQContextType | null>(null);

export function RFQProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: Omit<RFQItem, "quantity">) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: string, qty: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));
  const clearCart = () => setItems([]);

  return (
    <RFQContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, isOpen, setIsOpen }}>
      {children}
    </RFQContext.Provider>
  );
}

export function useRFQ() {
  const ctx = useContext(RFQContext);
  if (!ctx) throw new Error("useRFQ must be used within RFQProvider");
  return ctx;
}
