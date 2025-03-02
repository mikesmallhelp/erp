"use client";

import React, { createContext, useContext, useState } from 'react';
import { departments, employees, products } from './data';
import { Department, Employee, Product, Cart, CartItem } from './types';

interface StoreContextType {
  // Data
  departments: Department[];
  employees: Employee[];
  products: Product[];
  cart: Cart;
  
  // Department functions
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, department: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  
  // Employee functions
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  // Product functions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart functions
  addToCart: (productId: string, quantity: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departmentsState, setDepartments] = useState<Department[]>(departments);
  const [employeesState, setEmployees] = useState<Employee[]>(employees);
  const [productsState, setProducts] = useState<Product[]>(products);
  const [cartState, setCart] = useState<Cart>({ items: [], totalPrice: 0 });

  // Department functions
  const addDepartment = (department: Omit<Department, 'id'>) => {
    const newDepartment = {
      ...department,
      id: Math.random().toString(36).substr(2, 9),
    };
    setDepartments([...departmentsState, newDepartment]);
  };

  const updateDepartment = (id: string, department: Partial<Department>) => {
    setDepartments(
      departmentsState.map((d) => (d.id === id ? { ...d, ...department } : d))
    );
  };

  const deleteDepartment = (id: string) => {
    setDepartments(departmentsState.filter((d) => d.id !== id));
  };

  // Employee functions
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEmployees([...employeesState, newEmployee]);
  };

  const updateEmployee = (id: string, employee: Partial<Employee>) => {
    setEmployees(
      employeesState.map((e) => (e.id === id ? { ...e, ...employee } : e))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employeesState.filter((e) => e.id !== id));
  };

  // Product functions
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts([...productsState, newProduct]);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(
      productsState.map((p) => (p.id === id ? { ...p, ...product } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(productsState.filter((p) => p.id !== id));
  };

  // Cart functions
  const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
      const product = productsState.find((p) => p.id === item.productId);
      return total + (product ? product.retailPrice * item.quantity : 0);
    }, 0);
  };

  const addToCart = (productId: string, quantity: number) => {
    const existingItem = cartState.items.find((item) => item.productId === productId);
    
    let newItems;
    if (existingItem) {
      newItems = cartState.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...cartState.items, { productId, quantity }];
    }
    
    setCart({
      items: newItems,
      totalPrice: calculateTotalPrice(newItems),
    });
  };

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const newItems = cartState.items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    
    setCart({
      items: newItems,
      totalPrice: calculateTotalPrice(newItems),
    });
  };

  const removeFromCart = (productId: string) => {
    const newItems = cartState.items.filter((item) => item.productId !== productId);
    
    setCart({
      items: newItems,
      totalPrice: calculateTotalPrice(newItems),
    });
  };

  const clearCart = () => {
    setCart({ items: [], totalPrice: 0 });
  };

  const checkout = () => {
    // Tässä voitaisiin käsitellä tilaus, jos olisi backend
    clearCart();
  };

  const value = {
    departments: departmentsState,
    employees: employeesState,
    products: productsState,
    cart: cartState,
    
    addDepartment,
    updateDepartment,
    deleteDepartment,
    
    addEmployee,
    updateEmployee,
    deleteEmployee,
    
    addProduct,
    updateProduct,
    deleteProduct,
    
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    checkout,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};