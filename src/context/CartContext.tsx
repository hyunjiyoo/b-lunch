import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface CartContextProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const defaultValues = {
  count: 0,
  setCount: () => null,
};

const CartContext = createContext<CartContextProps>(defaultValues);

interface CartProviderProps {
  children: JSX.Element;
}

export function CartProvider({ children }: CartProviderProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(updateCount);
  }, []);

  return <CartContext.Provider value={{ count, setCount }}>{children}</CartContext.Provider>;
}

export function updateCount() {
  const cartItem = localStorage.cart;
  return cartItem ? Object.keys(JSON.parse(cartItem)).length : 0;
}

export const useCartCount = () => useContext(CartContext);
