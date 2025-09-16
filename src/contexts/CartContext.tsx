import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'paes' | 'lanches' | 'bolos' | 'salgados' | 'bebidas';
  isCustomizable?: boolean;
  isAvailable: boolean;
  isReadyToTake?: boolean; // true = pronta entrega, false = bolo personalizado
}

export interface CustomCakeOptions {
  massa: string;
  recheio: string;
  cobertura: string;
  pickupDate?: Date;
  pickupTime?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customOptions?: CustomCakeOptions;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number, customOptions?: CustomCakeOptions) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; customOptions?: CustomCakeOptions } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } };

const calculateCustomCakePrice = (basePrice: number, customOptions?: CustomCakeOptions): number => {
  if (!customOptions) return basePrice;
  
  let price = basePrice;
  
  // Add extra costs for custom options
  switch (customOptions.massa) {
    case 'chocolate-premium':
      price += 5;
      break;
    case 'red-velvet':
      price += 8;
      break;
  }
  
  switch (customOptions.recheio) {
    case 'nutella':
      price += 10;
      break;
    case 'doce-de-leite-argentino':
      price += 7;
      break;
  }
  
  switch (customOptions.cobertura) {
    case 'fondant':
      price += 15;
      break;
    case 'chantilly-com-frutas':
      price += 8;
      break;
  }
  
  return price;
};

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, customOptions } = action.payload;
      const existingItem = state.find(item => 
        item.product.id === product.id && 
        JSON.stringify(item.customOptions) === JSON.stringify(customOptions)
      );
      
      if (existingItem && !customOptions) {
        return state.map(item =>
          item.product.id === product.id && JSON.stringify(item.customOptions) === JSON.stringify(customOptions)
            ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * calculateCustomCakePrice(product.price, customOptions) }
            : item
        );
      } else {
        const totalPrice = quantity * calculateCustomCakePrice(product.price, customOptions);
        return [...state, { product, quantity, customOptions, totalPrice }];
      }
    }
    
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.payload.productId);
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => item.product.id !== productId);
      }
      return state.map(item =>
        item.product.id === productId
          ? { ...item, quantity, totalPrice: quantity * calculateCustomCakePrice(item.product.price, item.customOptions) }
          : item
      );
    }
    
    case 'CLEAR_CART':
      return [];
    
    case 'LOAD_CART':
      return action.payload.items;
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    // Load cart from localStorage on startup
    const savedCart = localStorage.getItem('paoquentinho_cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: { items: JSON.parse(savedCart) } });
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('paoquentinho_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1, customOptions?: CustomCakeOptions) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, customOptions } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};