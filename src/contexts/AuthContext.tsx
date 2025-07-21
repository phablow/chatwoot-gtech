import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@empresa.com',
    role: 'ADMIN',
    avatar: 'AU',
    status: 'online'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    email: 'carlos@empresa.com',
    role: 'AGENT',
    avatar: 'CM',
    status: 'online'
  },
  {
    id: '3',
    name: 'Ana Silva',
    email: 'ana@empresa.com',
    role: 'AGENT',
    avatar: 'AS',
    status: 'away'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('whatsapp_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        localStorage.removeItem('whatsapp_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser || password !== '123456') {
        throw new Error('Email ou senha inválidos');
      }

      setUser(foundUser);
      
      if (rememberMe) {
        localStorage.setItem('whatsapp_user', JSON.stringify(foundUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('whatsapp_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Update localStorage if exists
      const storedUser = localStorage.getItem('whatsapp_user');
      if (storedUser) {
        localStorage.setItem('whatsapp_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError('Erro ao atualizar perfil');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
