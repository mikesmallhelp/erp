import { EmployeeChart } from "@/components/dashboard/employee-chart";
import { ProductChart } from "@/components/dashboard/product-chart";
import { ShopChart } from "@/components/dashboard/shop-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Tervetuloa ERP-järjestelmään</h1>
          <p className="text-muted-foreground">
            Hallinnoi yrityksen työntekijöitä, osastoja, tuotteita ja verkkokauppaa.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Työntekijät
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  5 osastolla
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Osastot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Hallinto, Myynti, Tuotekehitys, Tuotanto, Markkinointi
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Tuotteet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  4 kategoriassa
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Verkkokauppa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">&#8364; 7,625.00</div>
                <p className="text-xs text-muted-foreground">
                  Varaston kokonaisarvo
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <EmployeeChart />
            <ProductChart />
            <ShopChart />
          </div>
        </div>
      </main>
    </div>
  );
}