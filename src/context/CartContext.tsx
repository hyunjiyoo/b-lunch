import { createContext, useContext, useState } from 'react';

interface CartContextProps {
  count: number;
  updateCount: () => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

interface CartProviderProps {
  children: JSX.Element;
}

export function CartProvider({ children }: CartProviderProps) {
  const [count, setCount] = useState<number>(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.cart ?? JSON.stringify({}));
    setCount(Object.keys(cart).length);
  }

  return <CartContext.Provider value={{ count, updateCount }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
