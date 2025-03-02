"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export function Navigation() {
  const pathname = usePathname();
  const { cart } = useStore();

  const routes = [
    {
      href: "/",
      label: "Etusivu",
      active: pathname === "/"
    },
    {
      href: "/employees",
      label: "Työntekijät",
      active: pathname.startsWith("/employees")
    },
    {
      href: "/departments",
      label: "Osastot",
      active: pathname.startsWith("/departments")
    },
    {
      href: "/products",
      label: "Tuotteet",
      active: pathname.startsWith("/products")
    },
    {
      href: "/shop",
      label: "Verkkokauppa",
      active: pathname.startsWith("/shop")
    }
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
      <div className="ml-auto flex items-center">
        <Link href="/cart">
          <Button variant="ghost" size="sm" className="relative">
            Ostoskori
            {cart.items.length > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cart.items.length}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
}