"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { ProductCard } from "../products/components/product-card";

export default function ShopPage() {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Hae kaikki kategoriat tuotteista
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Suodata tuotteet hakusanan ja kategorian perusteella
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      product.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Verkkokauppa</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Hae tuotteita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={categoryFilter || ""}
                onChange={(e) => setCategoryFilter(e.target.value || null)}
              >
                <option value="">Kaikki kategoriat</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">
                Ei tuotteita hakuehdoilla
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isShop={true} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}