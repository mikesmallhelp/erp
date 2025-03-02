// Osastot
export type Department = {
  id: string;
  name: string;
  description: string;
};

// Työntekijä
export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  departmentId: string;
  position: string;
  salary: number;
  bankAccount: string;
  startDate: string;
  experience: string[];
  skills: string[];
};

// Tuote
export type Product = {
  id: string;
  name: string;
  description: string;
  sku: string;
  manufacturingCost: number;
  retailPrice: number;
  stockQuantity: number;
  category: string;
  features: string[];
  imageUrl: string;
};

// Ostoskori
export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
};