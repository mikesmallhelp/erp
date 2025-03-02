"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Koska meillä ei ole oikeaa myyntidataa, luodaan kuvitteellista dataa
const generateSalesData = () => {
  const data = [];
  const months = [
    "Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä",
    "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"
  ];
  
  // Käytetään vakioita, jotta kuvaaja olisi aina sama
  const salesBase = [42, 48, 53, 61, 65, 72, 78, 82, 76, 68, 59, 52];
  const profitBase = [12, 14, 16, 19, 21, 24, 26, 28, 25, 22, 18, 16];
  
  for (let i = 0; i < 12; i++) {
    data.push({
      name: months[i],
      sales: salesBase[i] * 100,
      profit: profitBase[i] * 100
    });
  }
  
  return data;
};

export function ShopChart() {
  const salesData = generateSalesData();

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Verkkokaupan myynti ja tuotto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  const label = name === "sales" ? "Myynti" : "Tuotto";
                  return [`${typeof value === 'number' ? value.toFixed(2) : value} €`, label];
                }}
              />
              <Legend
                payload={[
                  { value: 'Myynti (€)', type: 'line', color: '#8884d8' },
                  { value: 'Tuotto (€)', type: 'line', color: '#82ca9d' }
                ]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="sales"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#82ca9d"
                name="profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}