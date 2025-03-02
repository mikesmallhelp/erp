"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStore } from "@/lib/store";
import { employeeSchema } from "@/lib/validations";
import { Employee } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  employee?: Employee;
  isEditing?: boolean;
}

export function EmployeeForm({ employee, isEditing = false }: EmployeeFormProps) {
  const router = useRouter();
  const { departments, addEmployee, updateEmployee } = useStore();
  const [skills, setSkills] = useState<string[]>(employee?.skills || []);
  const [experiences, setExperiences] = useState<string[]>(employee?.experience || []);
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentExperience, setCurrentExperience] = useState("");

  const defaultValues: Partial<EmployeeFormValues> = {
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    address: {
      street: employee?.address.street || "",
      postalCode: employee?.address.postalCode || "",
      city: employee?.address.city || "",
    },
    departmentId: employee?.departmentId || "",
    position: employee?.position || "",
    salary: employee?.salary || 0,
    bankAccount: employee?.bankAccount || "",
    startDate: employee?.startDate || new Date().toISOString().slice(0, 10),
    skills: employee?.skills || [],
    experience: employee?.experience || [],
  };

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const onSubmit = (data: EmployeeFormValues) => {
    // Lisätään taidot ja kokemus lomakkeen tietoihin
    data.skills = skills;
    data.experience = experiences;
    
    if (isEditing && employee) {
      updateEmployee(employee.id, data);
      router.push(`/employees/${employee.id}`);
    } else {
      addEmployee(data);
      router.push("/employees");
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() !== "" && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const addExperience = () => {
    if (currentExperience.trim() !== "" && !experiences.includes(currentExperience.trim())) {
      setExperiences([...experiences, currentExperience.trim()]);
      setCurrentExperience("");
    }
  };

  const removeExperience = (experienceToRemove: string) => {
    setExperiences(experiences.filter((exp) => exp !== experienceToRemove));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-6 pt-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">
              {isEditing ? "Muokkaa työntekijää" : "Lisää työntekijä"}
            </h1>
            <Button 
              variant="outline" 
              onClick={() => router.push(isEditing && employee ? `/employees/${employee.id}` : "/employees")}
            >
              Peruuta
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Perustiedot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Etunimi</FormLabel>
                          <FormControl>
                            <Input placeholder="Etunimi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sukunimi</FormLabel>
                          <FormControl>
                            <Input placeholder="Sukunimi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sähköposti</FormLabel>
                        <FormControl>
                          <Input placeholder="esimerkki@firma.fi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Puhelinnumero</FormLabel>
                        <FormControl>
                          <Input placeholder="040-1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Osoitetiedot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Katuosoite</FormLabel>
                        <FormControl>
                          <Input placeholder="Katuosoite" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postinumero</FormLabel>
                          <FormControl>
                            <Input placeholder="00100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kaupunki</FormLabel>
                          <FormControl>
                            <Input placeholder="Helsinki" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Työhön liittyvät tiedot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tehtävänimike</FormLabel>
                        <FormControl>
                          <Input placeholder="Tehtävänimike" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Osasto</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Valitse osasto</option>
                            {departments.map((department) => (
                              <option key={department.id} value={department.id}>
                                {department.name}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aloituspäivä</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Palkka- ja tilitiedot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Palkka (€/kk)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tilinumero</FormLabel>
                        <FormControl>
                          <Input placeholder="FI00 0000 0000 0000 00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taidot ja kokemus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <FormLabel>Taidot</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Lisää taito"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill}>
                        Lisää
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                        >
                          {skill}
                          <button
                            type="button"
                            className="ml-1 text-primary/60 hover:text-primary"
                            onClick={() => removeSkill(skill)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <FormLabel>Kokemus</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Lisää kokemus"
                        value={currentExperience}
                        onChange={(e) => setCurrentExperience(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addExperience();
                          }
                        }}
                      />
                      <Button type="button" onClick={addExperience}>
                        Lisää
                      </Button>
                    </div>
                    <div className="mt-2 space-y-2">
                      {experiences.map((exp) => (
                        <div
                          key={exp}
                          className="flex items-center justify-between rounded-md border p-2 text-sm"
                        >
                          {exp}
                          <button
                            type="button"
                            className="text-destructive"
                            onClick={() => removeExperience(exp)}
                          >
                            Poista
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  {isEditing ? "Tallenna muutokset" : "Lisää työntekijä"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}