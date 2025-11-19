'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, AddToCartRequest } from '@/src/types/cart';
import { cartApi } from '@/src/lib/api/cart';
import { useAuth } from '@/src/hooks/useAuth';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (item: AddToCartRequest) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setIsLoading(true);
    try {
      const data = await cartApi.getCart();
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (item: AddToCartRequest) => {
    if (!user) return; // Or redirect to login
    try {
      const updatedCart = await cartApi.addToCart(item);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const updatedCart = await cartApi.updateCartItem({ itemId, quantity });
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update cart item', error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const updatedCart = await cartApi.removeFromCart(itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCart(null);
    } catch (error) {
      console.error('Failed to clear cart', error);
    }
  };

  const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
