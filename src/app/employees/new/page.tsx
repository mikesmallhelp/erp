"use client";

import { EmployeeForm } from "../components/employee-form";
import { StoreProvider } from "@/lib/store";

export default function NewEmployeePage() {
  return (
    <StoreProvider>
      <EmployeeForm />
    </StoreProvider>
  );
}