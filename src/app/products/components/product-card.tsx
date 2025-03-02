"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  isShop?: boolean;
}

export function ProductCard({ product, isShop = false }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="aspect-square w-full relative mb-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
          {product.imageUrl ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Ei kuvaa
            </div>
          )}
        </div>
        <p className="text-sm line-clamp-2 mb-2">{product.description}</p>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Hinta:</span>
            <span className="font-bold">{product.retailPrice.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Varastossa:</span>
            <span>{product.stockQuantity} kpl</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {isShop ? (
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={product.stockQuantity <= 0}
          >
            {product.stockQuantity > 0 ? "Lisää koriin" : "Loppu varastosta"}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => router.push(`/products/${product.id}`)}
              className="flex-1"
            >
              Tiedot
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/products/${product.id}/edit`)}
              className="flex-1"
            >
              Muokkaa
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}