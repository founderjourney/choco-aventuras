"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  name: string;
  role: string;
  loginTime: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem('admin_authenticated');
        const userData = localStorage.getItem('admin_user');

        if (isAuthenticated === 'true' && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    try {
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error saving auth data:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    setUser(null);
    router.push('/admin/login');
  };

  const requireAuth = () => {
    if (!isLoading && !user) {
      router.push('/admin/login');
      return false;
    }
    return true;
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    requireAuth
  };
}