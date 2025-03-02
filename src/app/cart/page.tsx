"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  const router = useRouter();
  const { cart, products, updateCartItem, removeFromCart, clearCart, checkout } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Haetaan kunkin tuotteen tiedot ostoskorin perusteella
  const cartItems = cart.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
      total: product ? product.retailPrice * item.quantity : 0,
    };
  });

  const handleQuantityChange = (productId: string, quantity: number) => {
    const numValue = Math.max(1, Math.min(99, quantity));
    updateCartItem(productId, numValue);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simuloidaan checkout-prosessia
    setTimeout(() => {
      checkout();
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1500);
  };

  if (checkoutSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-6 pt-10">
          <div className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-center">Kiitos tilauksesta!</h1>
            <p className="text-center text-muted-foreground">
              Tilauksesi on vastaanotettu ja käsitellään pian.
            </p>
            <Button onClick={() => {
              setCheckoutSuccess(false);
              router.push("/shop");
            }}>
              Jatka ostoksia
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Ostoskori</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground mb-4">
                Ostoskorisi on tyhjä
              </p>
              <Button onClick={() => router.push("/shop")}>
                Siirry verkkokauppaan
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tuotteet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItems.map((item) => item.product && (
                        <div
                          key={item.productId}
                          className="flex items-start space-x-4 py-4 border-b last:border-0"
                        >
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
                            {item.product.imageUrl ? (
                              <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.product.imageUrl})` }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                Ei kuvaa
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium line-clamp-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.product.retailPrice.toFixed(2)} € / kpl
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20">
                              <Input
                                type="number"
                                min="1"
                                max="99"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                className="text-center"
                              />
                            </div>
                            <div className="w-20 text-right">
                              <p className="font-medium">
                                {item.total.toFixed(2)} €
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.productId)}
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={clearCart}
                      >
                        Tyhjennä kori
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Yhteenveto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tuotteet yhteensä:</span>
                        <span>{cart.totalPrice.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Kokonaissumma:</span>
                        <span>{cart.totalPrice.toFixed(2)} €</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? "Käsitellään..." : "Tilaa tuotteet"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/shop")}
                    >
                      Jatka ostoksia
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}