"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProductChart() {
  const { products } = useStore();

  // Ryhmitellään tuotteet kategorioittain
  const productCategories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        category: product.category,
        count: 0,
        totalValue: 0
      };
    }
    
    acc[product.category].count += 1;
    acc[product.category].totalValue += product.retailPrice * product.stockQuantity;
    
    return acc;
  }, {} as Record<string, { category: string; count: number; totalValue: number }>);

  const chartData = Object.values(productCategories);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Tuotteet kategorioittain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "count") return [`${value} kpl`, "Tuotteita"];
                  if (name === "totalValue") return [`${value.toFixed(2)} €`, "Varaston arvo"];
                  return [value, name];
                }}
              />
              <Legend
                payload={[
                  { value: 'Tuotteita', type: 'square', color: '#8884d8' },
                  { value: 'Varaston arvo (€)', type: 'square', color: '#82ca9d' }
                ]}
              />
              <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="count" />
              <Bar yAxisId="right" dataKey="totalValue" fill="#82ca9d" name="totalValue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}