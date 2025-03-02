"use client";

import { useStore } from "@/lib/store";
import { EmployeeForm } from "../../components/employee-form";
import { StoreProvider } from "@/lib/store";

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  // StoreProvider-komponentin sisällä käytämme custom hook, joka palauttaa EmployeeForm-komponentin
  function EditEmployeeWithStore() {
    const { employees } = useStore();
    const employee = employees.find((e) => e.id === params.id);
    
    if (!employee) {
      return <div>Työntekijää ei löytynyt</div>;
    }
    
    return <EmployeeForm employee={employee} isEditing={true} />;
  }

  return (
    <StoreProvider>
      <EditEmployeeWithStore />
    </StoreProvider>
  );
}