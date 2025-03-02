"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmployeesPage() {
  const { employees, departments } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Suodatetaan työntekijät hakusanan perusteella
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
           employee.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Etsitään osaston nimi
  const getDepartmentName = (departmentId: string) => {
    const department = departments.find((d) => d.id === departmentId);
    return department ? department.name : "Ei osastoa";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Työntekijät</h1>
            <Link href="/employees/new">
              <Button>Lisää työntekijä</Button>
            </Link>
          </div>

          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input
              placeholder="Hae työntekijää..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                onClick={() => setSearchTerm("")}
              >
                X
              </Button>
            )}
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="cards">Kortit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-4 text-left">Nimi</th>
                      <th className="p-4 text-left">Osasto</th>
                      <th className="p-4 text-left">Tehtävä</th>
                      <th className="p-4 text-left">Sähköposti</th>
                      <th className="p-4 text-left">Puhelin</th>
                      <th className="p-4 text-left">Toiminnot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td className="p-4">
                          {getDepartmentName(employee.departmentId)}
                        </td>
                        <td className="p-4">{employee.position}</td>
                        <td className="p-4">{employee.email}</td>
                        <td className="p-4">{employee.phone}</td>
                        <td className="p-4">
                          <Link href={`/employees/${employee.id}`}>
                            <Button variant="outline" size="sm">
                              Näytä
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="cards">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id}>
                    <CardHeader>
                      <CardTitle>
                        {employee.firstName} {employee.lastName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium">
                        {employee.position}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {getDepartmentName(employee.departmentId)}
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Sähköposti:</span>{" "}
                          {employee.email}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Puhelin:</span>{" "}
                          {employee.phone}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link href={`/employees/${employee.id}`}>
                          <Button className="w-full" variant="outline" size="sm">
                            Näytä tiedot
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}