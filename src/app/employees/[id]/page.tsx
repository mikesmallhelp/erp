"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { employees, departments, deleteEmployee } = useStore();
  const employeeId = params.id;

  const employee = employees.find((e) => e.id === employeeId);
  
  if (!employee) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-6 pt-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Työntekijää ei löytynyt</h1>
            <Button onClick={() => router.push("/employees")}>Takaisin</Button>
          </div>
        </main>
      </div>
    );
  }

  const department = departments.find((d) => d.id === employee.departmentId);

  const handleDelete = () => {
    if (window.confirm("Haluatko varmasti poistaa tämän työntekijän?")) {
      deleteEmployee(employeeId);
      router.push("/employees");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {employee.firstName} {employee.lastName}
            </h1>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => router.push("/employees")}
              >
                Takaisin
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push(`/employees/${employeeId}/edit`)}
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Perustiedot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">Tehtävä:</span> {employee.position}
                </div>
                <div>
                  <span className="font-semibold">Osasto:</span> {department?.name || "Ei osastoa"}
                </div>
                <div>
                  <span className="font-semibold">Aloituspäivä:</span> {employee.startDate}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yhteystiedot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">Sähköposti:</span> {employee.email}
                </div>
                <div>
                  <span className="font-semibold">Puhelin:</span> {employee.phone}
                </div>
                <div>
                  <span className="font-semibold">Osoite:</span> {employee.address.street}, {employee.address.postalCode} {employee.address.city}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Palkka- ja tilitiedot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">Palkka:</span> {employee.salary.toFixed(2)} €/kk
                </div>
                <div>
                  <span className="font-semibold">Tilinumero:</span> {employee.bankAccount}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kokemus ja taidot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Kokemus:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {employee.experience.map((exp, i) => (
                      <li key={i} className="text-sm">{exp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Taidot:</h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}