"use client";

import { useStore } from "@/lib/store";
import { ProductForm } from "../../components/product-form";
import { StoreProvider } from "@/lib/store";

export default function EditProductPage({ params }: { params: { id: string } }) {
  // StoreProvider-komponentin sisällä käytämme custom hook, joka palauttaa ProductForm-komponentin
  function EditProductWithStore() {
    const { products } = useStore();
    const product = products.find((p) => p.id === params.id);
    
    if (!product) {
      return <div>Tuotetta ei löytynyt</div>;
    }
    
    return <ProductForm product={product} isEditing={true} />;
  }

  return (
    <StoreProvider>
      <EditProductWithStore />
    </StoreProvider>
  );
}