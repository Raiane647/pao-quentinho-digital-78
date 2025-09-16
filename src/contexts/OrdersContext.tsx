import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Recebido' | 'Em Preparo' | 'Pronto para Retirada' | 'Concluído';
  paymentMethod: 'balcao' | 'cartao' | 'pix';
  createdAt: Date;
  pickupTime?: Date;
  estimatedTime?: number; // minutes for ready-to-go items
}

interface OrdersContextType {
  orders: Order[];
  createOrder: (items: CartItem[], paymentMethod: Order['paymentMethod'], userId: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders deve ser usado dentro de um OrdersProvider');
  }
  return context;
};

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage on startup
    const savedOrders = localStorage.getItem('paoquentinho_orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        pickupTime: order.pickupTime ? new Date(order.pickupTime) : undefined
      }));
      setOrders(parsedOrders);
    }
  }, []);

  useEffect(() => {
    // Save orders to localStorage whenever they change
    localStorage.setItem('paoquentinho_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (items: CartItem[], paymentMethod: Order['paymentMethod'], userId: string): Order => {
    const hasCustomCake = items.some(item => item.customOptions);
    const pickupTime = hasCustomCake 
      ? items.find(item => item.customOptions)?.customOptions?.pickupDate 
      : undefined;
    
    const estimatedTime = hasCustomCake ? undefined : 5; // 5 minutes for ready-to-go items

    const newOrder: Order = {
      id: Date.now().toString(),
      userId,
      items,
      totalPrice: items.reduce((sum, item) => sum + item.totalPrice, 0),
      status: 'Recebido',
      paymentMethod,
      createdAt: new Date(),
      pickupTime,
      estimatedTime
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Simulate order status progression for demo
    if (!hasCustomCake) {
      setTimeout(() => updateOrderStatus(newOrder.id, 'Em Preparo'), 2000);
      setTimeout(() => updateOrderStatus(newOrder.id, 'Pronto para Retirada'), 300000); // 5 minutes
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  const value: OrdersContextType = {
    orders,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};