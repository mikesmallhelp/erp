"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreProvider } from "@/lib/store";

function ProductPageContent({ id }: { id: string }) {
  const router = useRouter();
  const { products, deleteProduct, addToCart } = useStore();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-6 pt-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Tuotetta ei löytynyt</h1>
            <Button onClick={() => router.push("/products")}>Takaisin</Button>
          </div>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Haluatko varmasti poistaa tämän tuotteen?")) {
      deleteProduct(id);
      router.push("/products");
    }
  };

  const handleAddToCart = () => {
    addToCart(id, 1);
  };

  const profit = product.retailPrice - product.manufacturingCost;
  const profitMargin = (profit / product.retailPrice) * 100;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => router.push("/products")}
              >
                Takaisin
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push(`/products/${id}/edit`)}
              >
                Muokkaa
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                Poista
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
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
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tuotetiedot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">SKU:</span> {product.sku}
                  </div>
                  <div>
                    <span className="font-semibold">Kategoria:</span> {product.category}
                  </div>
                  <div>
                    <span className="font-semibold">Varastossa:</span> {product.stockQuantity} kpl
                  </div>
                  <div className="pt-2">
                    <p className="text-sm">{product.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hinta ja tuotto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">Myyntihinta:</span> {product.retailPrice.toFixed(2)} €
                  </div>
                  <div>
                    <span className="font-semibold">Valmistuskustannus:</span> {product.manufacturingCost.toFixed(2)} €
                  </div>
                  <div>
                    <span className="font-semibold">Tuotto:</span> {profit.toFixed(2)} € ({profitMargin.toFixed(1)}%)
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ominaisuudet</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Button 
                className="w-full" 
                onClick={handleAddToCart}
                disabled={product.stockQuantity <= 0}
              >
                {product.stockQuantity > 0 ? "Lisää ostoskoriin" : "Loppu varastosta"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <StoreProvider>
      <ProductPageContent id={params.id} />
    </StoreProvider>
  );
}