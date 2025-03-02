"use client";

import { ProductForm } from "../components/product-form";
import { StoreProvider } from "@/lib/store";

export default function NewProductPage() {
  return (
    <StoreProvider>
      <ProductForm />
    </StoreProvider>
  );
}