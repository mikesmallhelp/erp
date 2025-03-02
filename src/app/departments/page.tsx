"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { departmentSchema } from "@/lib/validations";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

type DepartmentFormValues = z.infer<typeof departmentSchema>;

export default function DepartmentsPage() {
  const { departments, employees, addDepartment, updateDepartment, deleteDepartment } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState<string | null>(null);

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: DepartmentFormValues) => {
    if (isEditing && currentDepartmentId) {
      updateDepartment(currentDepartmentId, data);
      setIsEditing(false);
      setCurrentDepartmentId(null);
    } else {
      addDepartment(data);
    }
    form.reset();
  };

  const startEditing = (departmentId: string) => {
    const department = departments.find((d) => d.id === departmentId);
    if (department) {
      form.reset({
        name: department.name,
        description: department.description,
      });
      setIsEditing(true);
      setCurrentDepartmentId(departmentId);
    }
  };

  const cancelEditing = () => {
    form.reset();
    setIsEditing(false);
    setCurrentDepartmentId(null);
  };

  const handleDelete = (departmentId: string) => {
    // Tarkistetaan, onko osastolla työntekijöitä
    const hasEmployees = employees.some(
      (employee) => employee.departmentId === departmentId
    );

    if (hasEmployees) {
      alert(
        "Osastoa ei voi poistaa, koska siihen on liitetty työntekijöitä. Siirrä työntekijät ensin toiselle osastolle."
      );
      return;
    }

    if (window.confirm("Haluatko varmasti poistaa tämän osaston?")) {
      deleteDepartment(departmentId);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Osastot</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isEditing ? "Muokkaa osastoa" : "Lisää uusi osasto"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nimi</FormLabel>
                            <FormControl>
                              <Input placeholder="Osaston nimi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kuvaus</FormLabel>
                            <FormControl>
                              <Input placeholder="Osaston kuvaus" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-2">
                        <Button type="submit">
                          {isEditing ? "Tallenna muutokset" : "Lisää osasto"}
                        </Button>
                        {isEditing && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={cancelEditing}
                          >
                            Peruuta
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Osastot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((department) => (
                      <div
                        key={department.id}
                        className="flex items-start justify-between space-x-4 rounded-md border p-4"
                      >
                        <div>
                          <h3 className="font-medium">{department.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {department.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {employees.filter(
                              (e) => e.departmentId === department.id
                            ).length}{" "}
                            työntekijää
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditing(department.id)}
                          >
                            Muokkaa
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(department.id)}
                          >
                            Poista
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}