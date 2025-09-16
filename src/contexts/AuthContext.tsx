import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Maria Silva',
    telefone: '(11) 98765-4321',
    email: 'maria@email.com',
    senha: '123456'
  },
  {
    id: '2',
    nome: 'João Santos',
    telefone: '(11) 99999-8888',
    email: 'joao@email.com',
    senha: '123456'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on startup
    const savedUser = localStorage.getItem('paoquentinho_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check existing users in localStorage
    const users = JSON.parse(localStorage.getItem('paoquentinho_users') || JSON.stringify(mockUsers));
    const foundUser = users.find((u: User) => u.email === email && u.senha === senha);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('paoquentinho_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('paoquentinho_users') || JSON.stringify(mockUsers));
    
    // Check if email already exists
    if (users.find((u: User) => u.email === userData.email)) {
      return false;
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString()
    };
    
    users.push(newUser);
    localStorage.setItem('paoquentinho_users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('paoquentinho_user', JSON.stringify(newUser));
    
    return true;
  };

  const loginWithGoogle = async (): Promise<void> => {
    // Simulate Google login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const googleUser: User = {
      id: 'google_' + Date.now(),
      nome: 'Usuário do Google',
      telefone: '(11) 99999-0000',
      email: 'usuario@gmail.com',
      senha: 'google_auth'
    };
    
    setUser(googleUser);
    localStorage.setItem('paoquentinho_user', JSON.stringify(googleUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('paoquentinho_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('paoquentinho_user', JSON.stringify(updatedUser));
      
      // Update in users list too
      const users = JSON.parse(localStorage.getItem('paoquentinho_users') || '[]');
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('paoquentinho_users', JSON.stringify(updatedUsers));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};